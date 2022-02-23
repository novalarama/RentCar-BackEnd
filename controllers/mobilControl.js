let modelMobil = require("../models/index").mobil

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

//untuk handle add data Mobil
exports.addDataMobil = (request, response) => {
    // tampung data request
    let newMobil = {
        nomor_mobil : request.body.nomor_mobil,
        merk : request.body.merk,
        jenis : request.body.jenis,
        warna : request.body.warna,
        tahun_pembuatan : request.body.tahun_pembuatan,
        biaya_sewa : request.body.biaya_sewa,
        image : request.body.image
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
exports.editDataMobil = (request, response) => {
    let idMobil = request.params.id_mobil
    let dataMobil = {
        nomor_mobil : request.body.nomor_mobil,
        merk : request.body.merk,
        jenis : request.body.jenis,
        warna : request.body.warna,
        tahun_pembuatan : request.body.tahun_pembuatan,
        biaya_sewa : request.body.biaya_sewa,
        image : request.body.image
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
exports.deleteDataMobil = (request, response) => {
    let idMobil = request.params.id_mobil

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