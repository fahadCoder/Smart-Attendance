// const { Sequelize } = require('sequelize');
import { Sequelize, DataTypes } from "sequelize";
import db from "../config/Database.js";

// const sequelize = require('../config/database');

const ExcelModel = db.define('TimetableTeacher', {
    Students
    : {
    type: Sequelize.STRING,
    allowNull: false
  },
  ModuleID
: {
    type: Sequelize.STRING,
    allowNull: false
  },
  CourseName
: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Startdate
  : {
      type: Sequelize.DATE,
      allowNull: false
    },
    Enddate
: {
    type: Sequelize.DATE,
    allowNull: false
  },
  Starttime
  : {
      type: Sequelize.STRING,
      allowNull: false
    },
    Endtime
: {
    type: Sequelize.STRING,
    allowNull: false
  },

  Monday
  : {
      type: Sequelize.STRING,
      allowNull: false
    },
Tuesday
    : {
        type: Sequelize.STRING,
        allowNull: false
      },
    Wednesday
      : {
          type: Sequelize.STRING,
          allowNull: false
        },
    Thursday
        : {
            type: Sequelize.STRING,
            allowNull: false
          },
         Friday
          : {
              type: Sequelize.STRING,
              allowNull: false
            },
            Saturday
            : {
                type: Sequelize.STRING,
                allowNull: false
              },
              Sunday
              : {
                  type: Sequelize.STRING,
                  allowNull: false
                },
                TeacherName
                : {
                    type: Sequelize.STRING,
                    allowNull: false
                  },
                  TeacherId
                  : {
                      type: Sequelize.STRING,
                      allowNull: false
                    },
});

// module.exports = ExcelModel;
export default ExcelModel;
