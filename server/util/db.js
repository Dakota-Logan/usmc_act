//* Database interface library. EZ BreZ
const pgp = require('pg-promise')(/* options */),
	  //* Database connection received from an environment variable.
	  cn  = pgp(process.env.database);

//* Using a class to easily export into other file for use, good practice with classes.
class deltaBravo {
	constructor() {
		//* Connect to the database with the interface.
		private this.db = pgp(cn);
	}
	
	//? This is a parameterized query, which runs the variables as parameters so any hidden injection wont be run as postgres code. Neat lil feature I just found.
	#pq = require('pg-promise').ParameterizedQuery;
	
	
	async login( lst, pwd ) {
		try {
			let req = pq({ text: "SELECT * FROM user_tracker WHERE first = $1 AND pwd = $2", values: [ lst, pwd ] });
			return await db.one(req);
		} catch (e) {
			throw 110;
		}
	}
	
	async check_in( id ) {
		try {
			let req = new this.#pq({ text: "UPDATE user_tracker SET in = true WHERE id = $1", values: [id] });
			return await this.db.one(req);
		} catch (e) {
			throw 111;
		}
	}
	
	async check_out( id, reason ) {
		try {
			let req = this.#pq({ text: "UPDATE user_tracker " });//todo insert query
			return await this.db.one
		} catch (e) {
			throw 112;
		}
	}
	
	async roster() {
		try {
			return await this.db.one("SELECT * FROM user_tracker");
		} catch (e) {
			throw 113;
		}
	}
	
}

Module.exports = new deltaBravo();