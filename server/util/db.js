//* Database interface library. EZ BreZ
const { Client } = require('pg');

//* Using a class to easily export into other file for use, good practice with classes.
class deltaBravo {
	options = {
		timeZone: "EST",
		year: "numeric",
		month: "numeric",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		hour12: false
	}
	time    = new Intl.DateTimeFormat([], this.options).format;
	
	constructor() {
		//* Connect to the database with the interface.
		
		this.client = new Client({ connectionString: process.env.db })
		this.client.connect()
	}
	
	//? This is a parameterized query, which runs the variables as parameters so any hidden injection wont be run as postgres code. Neat lil feature I just found.
	
	async retrieveUser(name) {
		//todo need [hash, salt, iter]
		let [f, l] = name.split(".");
		if (f && l) {
			let text   = "SELECT * FROM user_tracker WHERE first = $1 AND last = $2",
				values = [f, l]
			return await this.client.query({ text, values });
		}
	}
	
	async changePassword(id, parts) {
		let [f, l] = id.split(".");
		if (f && l) {
			let text   = "UPDATE user_tracker SET hash = $3, salt = $4, iter = $5 WHERE first = $1 AND last = $2",
				values = [f, l, parts.hash, parts.salt, parts.iter]
			return await this.client.query({ text, values })
		}
	}
	
	async check_in(id) {
		let checkInTime = this.time(new Date());
		//! LOOK AT ERROR IN CONSOLE - THIS IS AFTER CLICKING THE SIGN_IN BUTTON.
		let text        = 'UPDATE user_tracker\nSET "in" = $1, last_date = $2,  reason = $3 \nWHERE id = $4;'
			, values    = [true, checkInTime, "N/A", id];
		try {
			return await this.client.query({ text, values });
		} catch (e) {
			console.error(e);
		}
	}
	
	async check_out(id, reason) {
	
	}
	
	async roster() {
	
	}
}

module.exports = new deltaBravo();