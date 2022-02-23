const express = require(`express`)
const app = express()

app.use(express.json())

let pelangganControl = require("../controllers/pelangganControl")

//end point GET untuk menampilkan data Pelanggan
app.get("/", pelangganControl.getDataPelanggan)

//end point POST untuk menambah data Pelanggan
app.post("/", pelangganControl.addDataPelanggan)

//end point PUT untuk mengedit data Pelanggan
app.put("/:id_pelanggan", pelangganControl.editDataPelanggan)

//end point DELETE untuk menghapus data Pelanggan
app.delete("/:id_pelanggan", pelangganControl.deleteDataPelanggan)

module.exports = app