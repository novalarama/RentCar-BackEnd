'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sewa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.pelanggan, {
        foreignKey: "id_pelanggan",
        as: "pelanggan"
      })

      this.belongsTo(models.karyawan, {
        foreignKey: "id_karyawan",
        as: "karyawan"
      })

      this.belongsTo(models.mobil, {
        foreignKey: "id_mobil",
        as: "mobil"
      })
    }
  }
  sewa.init({
    id_sewa:{
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_mobil: DataTypes.STRING,
    id_karyawan: DataTypes.STRING,
    id_pelanggan: DataTypes.STRING,
    tgl_sewa: DataTypes.DATE,
    tgl_kembali: DataTypes.DATE,
    total_bayar: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'sewa',
    tableName: `sewa`
  });
  return sewa;
};