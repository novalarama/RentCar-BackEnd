const md5 = require("md5")
let modelKaryawan = require("../models/index").karyawan


exports.getDataKaryawan = (request, response) => {
    modelKaryawan.findAll()
        .then(result => {
            return response.json({
                Count : result.length,
                Karyawan : result
            })
        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })
}

//untuk handle add data Karyawan
exports.addDataKaryawan = (request, response) => {
    // tampung data request
    let newKaryawan = {
        nama_karyawan : request.body.nama_karyawan,
        alamat_karyawan : request.body.alamat_karyawan,
        kontak_karyawan : request.body.kontak_karyawan,
        username : request.body.username,
        password : md5(request.body.password)
    }
    modelKaryawan.create(newKaryawan)
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

//untuk handle edit data Karyawan
exports.editDataKaryawan = (request, response) => {
    let idKaryawan = request.params.id_karyawan
    let dataKaryawan = {
        nama_karyawan : request.body.nama_karyawan,
        alamat_karyawan : request.body.alamat_karyawan,
        kontak_karyawan : request.body.kontak_karyawan,
        username : request.body.username,
        password : md5(request.body.password)
    }
    // eksekusi 
    modelKaryawan.update(dataKaryawan, {where :{id_karyawan:idKaryawan}})
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

//untuk handle delete data Karyawan
exports.deleteDataKaryawan = (request, response) => {
    let idKaryawan = request.params.id_karyawan

    // eksekusi 
    modelKaryawan.destroy({where :{id_karyawan:idKaryawan}})
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