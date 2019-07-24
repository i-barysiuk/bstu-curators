'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('groups', {
    uuid: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
      },
      userId: {
        type: Sequelize.UUID,
        primaryKey: false
      },
      faculty: {
        type: Sequelize.ENUM('ФЭИС','ЭФ ','СФ','МСФ','ФИСЭ', 'Заочное', 'Иностранные'),
        allowNull: false
      },
      name: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      total: {
        type: Sequelize.INT,
        allowNull: false
      },
      gender: {
          men = {
            type: Sequelize.INT,
            allowNull: false
          },
          women = {
            type: Sequelize.INT,
            allowNull: false
          }
        },
      comunity: {
          brsm = {
            type: Sequelize.INT,
            allowNull: false
          },
          profcom = {
            type: Sequelize.INT,
            allowNull: false
          },
          belrus = {
            type: Sequelize.INT,
            allowNull: false
          },
          other = {
            type: Sequelize.INT,
            allowNull: false
          }
      },
      family: {
          standart = {
            type: Sequelize.INT,
            allowNull: false
          },
          many = {
            type: Sequelize.INT,
            allowNull: false
          },
          incomplete = {
            type: Sequelize.INT,
            allowNull: false
          },
          orphans = {
            type: Sequelize.INT,
            allowNull: false
          }
      },
      geography: {
          local = 
          {
            type: Sequelize.INT,
            allowNull: false
          },
          nonresident = {
            type: Sequelize.INT,
            allowNull: false
          },
          foreigners = {
            type: Sequelize.INT,
            allowNull: false
          }
      },
      living: {

          parents = {
            type: Sequelize.INT,
            allowNull: false
          },
          relatives = {
            type: Sequelize.INT,
            allowNull: false
          },
          hostel = {
            type: Sequelize.INT,
            allowNull: false
          },
          apartments = {
            type: Sequelize.INT,
            allowNull: false
          }
      },
      social: {
        type: Sequelize.JSON({
          
        }),
        allowNull: true
      },
      others: {
        type: Sequelize.TEXT,
        allowNull: true
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('groups');
  }
};