const express = require(`express`)
const app = express()

app.use(express.json())

let pelangganControl = require("../controllers/pelangganControl")

let authorization = require("../middlewares/authorization")

//end point GET untuk menampilkan data Pelanggan
app.get("/", authorization.authorization, pelangganControl.getDataPelanggan)

//end point POST untuk menambah data Pelanggan
app.post("/", authorization.authorization, pelangganControl.addDataPelanggan)

//end point PUT untuk mengedit data Pelanggan
app.put("/:id_pelanggan", authorization.authorization, pelangganControl.editDataPelanggan)

//end point DELETE untuk menghapus data Pelanggan
app.delete("/:id_pelanggan", authorization.authorization, pelangganControl.deleteDataPelanggan)

module.exports = app