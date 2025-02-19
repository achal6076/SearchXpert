import mysql from 'mysql2/promise'

export const pool = mysql.createPool({
  host: 'localhost',
  user: 'peeyush',
  password: 'peeyush',
  port:3306,
  database: 'mint100126',
  waitForConnections: true,
  connectionLimit: 10
})

export async function trackSearch(term) {
  const [rows] = await pool.execute(
    `INSERT INTO search_terms (term, frequency) 
     VALUES (?, 1)
     ON DUPLICATE KEY UPDATE frequency = frequency + 1`,
    [term]
  )
  return rows
}