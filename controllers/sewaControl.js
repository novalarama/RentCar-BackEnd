let modelSewa = require("../models/index").sewa
let modelMobil = require("../models/index").mobil

exports.getDataSewa = (request, response) => {
    modelSewa.findAll()
        .then(result => {
            return response.json({
                Count : result.length,
                Sewa : result
            })
        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })
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