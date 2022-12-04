const db = require("./db.js");

//todo! Check for auth headers

//todo! Set auth headers


//!login
async function login (lst, pwd) {
	let user = await db.login(lst, pwd);
	
	//todo! set auth headers
}