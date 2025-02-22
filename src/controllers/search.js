import { trackSearch } from '../services/mysql.js'
import { getSuggestions } from '../services/elastic.js'

export async function autoComplete(req, res) {
    try {
      const { prefix } = req.query
      if (!prefix) return res.status(400).json({ error: "Missing prefix" })
      
      const results = await getSuggestions(prefix)
      res.json(results.map(r => ({ term: r.text, score: r._score })))
    } catch (err) {
      console.error("Auto-complete error:", err)
      res.status(500).json({ error: "Failed to fetch suggestions" })
    }
  }
export async function logSearch(req, res) {
    console.log('hellow ')
    const { term } = req.body
    console.log('term ---->>>>',term)
  await trackSearch(term)
  res.sendStatus(200)
}