let modelPelanggan = require("../models/index").pelanggan

exports.getDataPelanggan = (request, response) => {
    modelPelanggan.findAll()
        .then(result => {
            return response.json({
                Count : result.length,
                Pelanggan : result
            })
        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })
}

//untuk handle add data Pelanggan
exports.addDataPelanggan = (request, response) => {
    // tampung data request
    let newPelanggan = {
        nama_pelanggan : request.body.nama_pelanggan,
        alamat_pelanggan : request.body.alamat_pelanggan,
        kontak : request.body.kontak
    }
    modelPelanggan.create(newPelanggan)
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

//untuk handle edit data Pelanggan
exports.editDataPelanggan = (request, response) => {
    let idPelanggan = request.params.id_pelanggan
    let dataPelanggan = {
        nama_pelanggan : request.body.nama_pelanggan,
        alamat_pelanggan : request.body.alamat_pelanggan,
        kontak : request.body.kontak
    }
    // eksekusi 
    modelPelanggan.update(dataPelanggan, {where :{id_pelanggan:idPelanggan}})
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

//untuk handle delete data Pelanggan
exports.deleteDataPelanggan = (request, response) => {
    let idPelanggan = request.params.id_pelanggan

    // eksekusi 
    modelPelanggan.destroy({where :{id_pelanggan:idPelanggan}})
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