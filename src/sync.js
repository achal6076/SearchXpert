import { client } from './services/elastic.js'
import { pool } from './services/mysql.js'

//Sync data to Elastic
async function syncData() {
  const [terms] = await pool.query(
    'SELECT term, frequency FROM search_terms'
  )

  const body = terms.flatMap(term => [
    { index: { _index: 'autocomplete', _id: term.term } },
    { 
      term: term.term,
      suggest: { input: term.term, weight: term.frequency },
      frequency: term.frequency
    }
  ])

  await client.bulk({ refresh: true, body })
}

syncData()
  .then(() => console.log('Sync completed'))
  .catch(err => console.error('Sync failed:', err))
  .finally(() => pool.end())