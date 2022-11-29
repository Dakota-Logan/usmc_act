const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://username:password@host:port/database')

db.one('SELECT $1 AS value', 123)
  .then((data) => {
	  console.log('DATA:', data.value)
  })
  .catch((error) => {
	  console.log('ERROR:', error)
  })