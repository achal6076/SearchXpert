import { Client } from '@elastic/elasticsearch'

//Connection With Elastic and authentication
export const client = new Client({
  node: 'http://localhost:9200',
  auth: {
    username: 'elastic',
    password: 'elastic'
  }
})

client.ping()
  .then(() => console.log('Connected to Elasticsearch'))
  .catch(err => console.error('Elasticsearch connection failed:', err))

export async function getSuggestions(prefix) {
  const { body } = await client.search({
    index: 'autocomplete',
    body: {
      suggest: {
        "autocomplete-suggest": {
          prefix: prefix,
          completion: {
            field: "suggest",
            size: 10,
            skip_duplicates: true
          }
        }
      }
    }
  })

  return body.suggest['autocomplete-suggest'][0].options
}