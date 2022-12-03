const pgp = require('pg-promise')(/* options */);
const db = pgp(process.env.database);

db.one('SELECT $1 AS value', 123)
  .then((data) => {
	  console.log('DATA:', data.value)
  })
  .catch((error) => {
	  console.log('ERROR:', error)
  })

function getPwd ( uid ) {
	let query = `SELECT 1 WHERE `
	db.one()
}