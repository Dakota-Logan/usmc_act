const express = require('express'),
	  router  = express.Router()
	  db      = require("../util/db.js");

let path = require("path"),
	curPath = __dirname + "/../views/html/";

/* GET home page. */
router.get('/', (req, res, next) => {
	console.log("in login GET")
	res.sendFile(path.join(curPath+"login.html"));
});


//todo Add the pathing that pushes admin users to the roster page immediately.
router.post("/", async (req, res, next) => {
	console.log("in login POST")
	console.log(req.body)
	let nm = req.body.name,
		pwd   = req.body.password;
	try {
		let suc = await db.login(nm, pwd);
	} catch (e) {
		throw 110
	}
	
	//check for user and auth
	//return good jwt
	//return no_user error
});

module.exports = router;
