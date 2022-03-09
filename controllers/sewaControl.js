let modelSewa = require("../models/index").sewa
let modelMobil = require("../models/index").mobil

//import sequelize operator
let sequelize = require(`sequelize`)
let Op = sequelize.Op

exports.getDataSewa = async(request, response) => {
    // variabel async digunakan ketika memakai await
  let dataSewa = await modelSewa.findAll({
    include: [
      "pelanggan",
      "karyawan",
      "mobil"
    ],
  }); //biasanya menggunakan seperti inti hanya untuk get
  return response.json({
    Count: dataSewa.length,
    Pelanggaran: dataSewa,
  });
}

exports.findSewa = async(request, response) => {
    let start = request.body.start // tgl awal
    let end = request.body.end // tgl akhir

    let dataSewa = await modelSewa.findAll({
        include: [
            "pelanggan",
            "karyawan",
            "mobil"
          ],
        where: {
            waktu: {[Op.between]:[start, end]}
          }
    })

    return response.json(dataSewa)
}

//untuk handle add data Sewa
exports.addDataSewa = async(request, response) => {
    let mobil = await modelMobil.findOne({
        where : {id_mobil: request.body.id_mobil}
    })
    let biayaSewa = mobil.biaya_sewa
    let tgl_kembali = new Date(request.body.tgl_kembali)
    let tgl_sewa = new Date(request.body.tgl_sewa)

    var dif = tgl_kembali.getTime() - tgl_sewa.getTime()
    var dif2 = dif/(1000*3600*24)

    let totalBayar = dif2 * biayaSewa
    // tampung data request
    let newSewa = {
        id_mobil : request.body.id_mobil,
        id_karyawan : request.body.id_karyawan,
        id_pelanggan : request.body.id_pelanggan,
        tgl_sewa : request.body.tgl_sewa,
        tgl_kembali : request.body.tgl_kembali,
        total_bayar :totalBayar
    }


    modelSewa.create(newSewa)
    .then(result => {
        return response.json({
            message : `Data has been inserted`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
}

//untuk handle edit data Sewa
exports.editDataSewa = (request, response) => {
    let idSewa = request.params.id_sewa
    let dataSewa = {
        id_mobil : request.body.id_mobil,
        id_karyawan : request.body.id_karyawan,
        id_pelanggan : request.body.id_pelanggan,
        tgl_sewa : request.body.tgl_sewa,
        tgl_kembali : request.body.tgl_kembali,
        total_bayar : request.body.total_bayar
    }
    // eksekusi 
    modelSewa.update(dataSewa, {where :{id_sewa:idSewa}})
    .then(result => {
        return response.json({
            message : `Data has been updated`
        })
    })
    .catch(error => {
        return response.json({
            message : error.message
        })
    })
}

//untuk handle delete data Sewa
exports.deleteDataSewa = (request, response) => {
    let idSewa = request.params.id_sewa

    // eksekusi 
    modelSewa.destroy({where :{id_sewa:idSewa}})
    .then(result => {
        return response.json({
            message : `Data has been deleted`
        })
    })
    .catch(error => {
        return response.json({
            message : error.message
        })
    })
}