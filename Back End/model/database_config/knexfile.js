const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "../../.env"),
});

module.exports = {
  development: {
    client: "mssql",
    connection: {
      server: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      options: {
        encrypt: true,
        trustServerCertificate: false,
      },
    },
  },
};
