//* Database interface library. EZ BreZ
const pgp = require('pg-promise')(/* options */),
	  //* Database connection received from an environment variable.
	  cn = pgp(process.env.database);

//* Using a class to easily export into other file for use, good practice with classes.
class deltaBravo {
	
	//* Connect to the database with the interface.
	db = pgp(cn);
	  //? This is a parameterized query, which runs the variables as parameters so any hidden injection wont be run as postgres code. Neat lil feature I just found.
	pq = require('pg-promise').ParameterizedQuery;
	
	async login (lst, pwd) {
		try {
			let req = pq({text: "SELECT * FROM user_tracker WHERE first = $1 AND pwd = $2", values: [lst, pwd]});
			return await db.one(req);
		} catch (e) {
			throw 110;
		}
	}
	
	/* ! these functions need not authenticate the user, the auth script should be doing that, so all they should be doing is performing the database
	!*	 operations, ie. check-in the user, return the roster, etc. */
	async check_in (id) {
		try {
			let req = pg();//todo insert query
		} catch (e) {
			throw 111;
		}
	}
	
	check_out (id, reason) {
		try {
			let req = pg();//todo insert query
		} catch (e) {
			throw 112;
		}
	}
	
	async roster (id) {
		try {
			let req = pg();//todo insert query
			
		} catch (e) {
			throw 113;
		}
	}
	
}

Module.exports = new deltaBravo();