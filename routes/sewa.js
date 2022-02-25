const express = require(`express`)
const app = express()

app.use(express.json())

let sewaControl = require("../controllers/sewaControl")
let authorization = require("../middlewares/authorization")

//end point GET untuk menampilkan data Sewa
app.get("/", authorization.authorization, sewaControl.getDataSewa)

//end point POST untuk menambah data Sewa
app.post("/", authorization.authorization, sewaControl.addDataSewa)

//end point PUT untuk mengedit data Sewa
app.put("/:id_sewa", authorization.authorization, sewaControl.editDataSewa)

//end point DELETE untuk menghapus data Sewa
app.delete("/:id_sewa", authorization.authorization, sewaControl.deleteDataSewa)

module.exports = app