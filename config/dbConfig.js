// const mysql = require("mysql");
// const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } =
//   process.env;

// module.exports = function () {
//   return {
//     init: function () {
//       return mysql.createConnection({
//         host: MYSQL_HOST,
//         port: MYSQL_PORT,
//         user: MYSQL_USER,
//         password: MYSQL_PASSWORD,
//         database: MYSQL_DATABASE,
//       });
//     },

//     connect: function (con) {
//       con.connect(function (err) {
//         if (err) {
//           console.error("mysql connection error :" + err);
//         } else {
//           console.info("mysql is connected successfully.");
//         }
//       });
//     },
//   };
// };

const mysql = require("mysql");
const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } =
  process.env;

module.exports = function () {
  return {
    init: function () {
      return mysql.createConnection({
        host: MYSQL_HOST,
        port: MYSQL_PORT,
        user: MYSQL_USER,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE,
      });
    },

    test_open: function (con) {
      con.connect(function (err) {
        if (err) {
          console.error("mysql connection error :" + err);
        } else {
          console.info("mysql is connected successfully.");
        }
      });
    },
  };
};
