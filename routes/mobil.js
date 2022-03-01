const express = require(`express`);
const app = express();

app.use(express.json());

let mobilControl = require("../controllers/mobilControl");
let authorization = require("../middlewares/authorization");
let uploadImage = require("../middlewares/uploadImage");

//end point GET untuk menampilkan data mobil
app.get("/", authorization.authorization, mobilControl.getDataMobil);

//end point POST untuk menambah data mobil
app.post(
  "/",
  [authorization.authorization, uploadImage.upload.single(`image`)],
  mobilControl.addDataMobil
);

//end point PUT untuk mengedit data mobil
app.put(
  "/:id_mobil",
  [authorization.authorization, uploadImage.upload.single(`image`)],
  mobilControl.editDataMobil
);

//end point DELETE untuk menghapus data mobil
app.delete(
  "/:id_mobil",
  authorization.authorization,
  mobilControl.deleteDataMobil
);

module.exports = app;
