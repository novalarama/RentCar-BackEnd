const express = require(`express`)
const app = express()

app.use(express.json())

let karyawanControl = require("../controllers/karyawanControl")

//end point GET untuk menampilkan data karyawan
app.get("/", karyawanControl.getDataKaryawan)

//end point POST untuk menambah data karyawan
app.post("/", karyawanControl.addDataKaryawan)

//end point PUT untuk mengedit data karyawan
app.put("/:id_karyawan", karyawanControl.editDataKaryawan)

//end point DELETE untuk menghapus data karyawan
app.delete("/:id_karyawan", karyawanControl.deleteDataKaryawan)

module.exports = app