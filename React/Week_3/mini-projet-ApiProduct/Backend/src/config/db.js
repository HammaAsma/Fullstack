import mysql from "mysql2/promise";

const connexion = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "product_data",
});

export default connexion;
