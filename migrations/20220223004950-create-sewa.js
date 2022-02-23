'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sewa', {
      id_sewa: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_mobil: {
        type: Sequelize.INTEGER,
        references : {
          model : "mobil",
          key : "id_mobil"
        }
      },
      id_karyawan: {
        type: Sequelize.INTEGER,
        references : {
          model : "karyawan",
          key : "id_karyawan"
        }
      },
      id_pelanggan: {
        type: Sequelize.INTEGER,
        references : {
          model : "pelanggan",
          key : "id_pelanggan"
        }
      },
      tgl_sewa: {
        type: Sequelize.DATE
      },
      tgl_kembali: {
        type: Sequelize.DATE
      },
      total_bayar: {
        type: Sequelize.DOUBLE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sewa');
  }
};