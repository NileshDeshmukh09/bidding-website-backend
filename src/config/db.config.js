 const env = {
    "development": {
      "username": process.env.DB_USER,
      "password": process.env.DB_PASSWORD,
      "database": process.env.DB_NAME,
      "host": process.env.DB_HOST,
      "dialect": "mysql"
    },
    "uat": {
      "username": process.env.DB_USER_uat,
      "password": process.env.DB_PASSWORD,
      "database": process.env.DB_NAME_uat,
      "host": process.env.DB_HOST_uat,
      "dialect": "mysql"
    },
    "production": {
      "username": process.env.DB_USER_prod,
      "password": process.env.DB_PASSWORD,
      "database": process.env.DB_NAME_prod,
      "host": process.env.DB_HOST,
      "dialect": "mysql"
  
    }
  }
  
  module.exports = { env }