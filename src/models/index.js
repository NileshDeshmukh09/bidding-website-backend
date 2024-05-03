const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/db.config');

const sequelize = new Sequelize(
  config.env.development.database,
  config.env.development.username,
  config.env.development.password,
  {
    host:  config.env.development.host,
    dialect:  config.env.development.dialect,
    sslmode: config.env.development.sslmode,
  }
);

// const sequelizeProd = new Sequelize(
//     config.env.production.database,
//     config.env.production.username,
//     config.env.production.password,
//     {
//       host:  config.env.production.host,
//       dialect:  config.env.production.dialect

//     }
//   );

const db = {};
// const proddb = {}

db.sequelize = sequelize
// proddb.sequelize =  sequelizeProd


db.User = require('../models/user')(sequelize, Sequelize);
db.Freelancer = require('../models/freelancer')(sequelize, Sequelize);
db.Client = require('../models/client')(sequelize, Sequelize);

module.exports = { db };
