const db = require("./db.js");


//!login
async function login (lst, pwd) {
	let user = await db.login(lst, pwd);
	
}

//check auth (for roster)