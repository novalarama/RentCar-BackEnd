const multer = require("multer") // memanggil library multer
const path = require("path") 
const fs = require("fs")
const { request } = require("http")

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, "./image")
        // ini config untuk menentukan folder penyimpanan file yang diupload
    },
    filename: (request, file, callback) => {
        callback(null, `image-${Date.now()}${path.extname(file.originalname)}`)
        // ini config untuk menentukan nama file yang diupload

    } 
})

exports.upload = multer({storage: storage})
