let modelMobil = require("../models/index").mobil

let path = require("path")
let fs = require("fs")

//import sequelize operator
let sequelize = require(`sequelize`)
let Op = sequelize.Op

exports.getDataMobil = (request, response) => {
    modelMobil.findAll()
        .then(result => {
            return response.json({
                Count : result.length,
                Mobil : result
            })
        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })
}

exports.findMobil = async(request, response) => {
    let keyword = request.body.keyword

    let dataMobil = await modelMobil.findAll({
        where : {
            [Op.or] : {
                nomor_mobil: {[Op.like]:`%${keyword}%`},
                merk: {[Op.like]:`%${keyword}%`},
                jenis: {[Op.like]:`%${keyword}%`},
                warna: {[Op.like]:`%${keyword}%`},
                tahun_pembuatan: {[Op.like]:`%${keyword}%`},
                biaya_sewa: {[Op.like]:`%${keyword}%`}
            }
        }
    })

    return response.json(dataMobil)
}

//untuk handle add data Mobil
exports.addDataMobil = (request, response) => {
    if(!request.file){
        return response.json({
            message : `nothing to upload`
        })
    }
    // tampung data request
    let newMobil = {
        nomor_mobil : request.body.nomor_mobil,
        merk : request.body.merk,
        jenis : request.body.jenis,
        warna : request.body.warna,
        tahun_pembuatan : request.body.tahun_pembuatan,
        biaya_sewa : request.body.biaya_sewa,
        image : request.file.filename
    }
    modelMobil.create(newMobil)
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

//untuk handle edit data Mobil
exports.editDataMobil = async(request, response) => {
    let idMobil = request.params.id_mobil
    let dataMobil = {
        nomor_mobil : request.body.nomor_mobil,
        merk : request.body.merk,
        jenis : request.body.jenis,
        warna : request.body.warna,
        tahun_pembuatan : request.body.tahun_pembuatan,
        biaya_sewa : request.body.biaya_sewa,
    }

    if (request.file) {
        let mobil = await modelMobil.findOne({where : {id_mobil : idMobil}})
        let oldFileName = mobil.image

        //delete file
        let location = path.join(__dirname, "../image", oldFileName)
        fs.unlink(location, error => console.log(error))

        //menyisipkan nama file baru ke da,am objek datasiswa
        dataMobil.image = request.file.filename

    }
    // eksekusi 
    modelMobil.update(dataMobil, {where :{id_mobil:idMobil}})
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

//untuk handle delete data Mobil
exports.deleteDataMobil = async(request, response) => {
    let idMobil = request.params.id_mobil

    //ambil dulu data filename yang akan dihapus
    let mobil = await modelMobil.findOne({where: {id_mobil: idMobil}})
    if(mobil){
        let oldFileName = mobil.image

        //delete file
        let location = path.join(__dirname, "../image", oldFileName)
        fs.unlink(location, error => console.log(error))
    }


    // eksekusi 
    modelMobil.destroy({where :{id_mobil:idMobil}})
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