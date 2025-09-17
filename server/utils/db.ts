import mysql, { createPool } from "mysql2"

 const db = createPool({
  host: 'localhost',
  user: 'root',
  password: 'elmarvel',
  database: 'plug',
}).promise()

 export default db