const mysql = require("mysql");

var pool = mysql.createPool({
  host: "mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com",
  user: "bsale_test",
  password: "bsale_test",
  database: "bsale_test",
});

const getProducts = () =>
  new Promise((resolve, reject) =>
    pool.query("SELECT * FROM product", (err, res, fields) => {
      if (err) reject(err);
      resolve(res);
    })
  );

const getProduct = (product) =>
  new Promise((resolve, reject) =>
    pool.query(
      `SELECT * FROM product WHERE name LIKE '%${product}%'`,
      (err, res, fields) => {
        console.log(res);
        if (err) reject(err);
        resolve(res);
      }
    )
  );

module.exports = { getProducts, getProduct };
