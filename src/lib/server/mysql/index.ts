import mysql from "mysql2/promise";

const pool = mysql.createPool({
  user: "jobsearch1",
  password: "Cat09021988",
  host: "localhost",
  database: "job_search"
});

export async function getConnection() {
  return await pool.getConnection();
}