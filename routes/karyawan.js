const express = require(`express`);
const app = express();

app.use(express.json());

let karyawanControl = require("../controllers/karyawanControl");
const userValidator = require("../middlewares/userValidator");
const authorization = require("../middlewares/authorization");

//end point GET untuk menampilkan data karyawan
app.get("/", [authorization.authorization], karyawanControl.getDataKaryawan);

app.post("/find", [authorization.authorization], karyawanControl.findUser);

//end point POST untuk menambah data karyawan
app.post(
  "/",
  [userValidator.validate, authorization.authorization],
  karyawanControl.addDataKaryawan
);

//end point PUT untuk mengedit data karyawan
app.put(
  "/:id_karyawan",
  [authorization.authorization],
  karyawanControl.editDataKaryawan
);

//end point DELETE untuk menghapus data karyawan
app.delete(
  "/:id_karyawan",
  [authorization.authorization],
  karyawanControl.deleteDataKaryawan
);

app.post("/auth", karyawanControl.authentication);

module.exports = app;
