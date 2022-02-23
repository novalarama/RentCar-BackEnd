const express = require(`express`)
const app = express()

app.use(express.json())

let mobilControl = require("../controllers/mobilControl")

//end point GET untuk menampilkan data mobil
app.get("/", mobilControl.getDataMobil)

//end point POST untuk menambah data mobil
app.post("/", mobilControl.addDataMobil)

//end point PUT untuk mengedit data mobil
app.put("/:id_mobil", mobilControl.editDataMobil)

//end point DELETE untuk menghapus data mobil
app.delete("/:id_mobil", mobilControl.deleteDataMobil)

module.exports = app