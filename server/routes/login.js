const express = require('express'),
	  router  = express.Router(),
	  db      = require("../util/db.js"),
	  auth    = require("../util/auth");

let path    = require("path"),
	curPath = __dirname + "/../views/html";

/* GET home page. */
router.get('/', (req, res, next) => {
	console.log("in login GET")
	res.sendFile(path.join(curPath + "/login.html"));
});

//todo Add the pathing that pushes admin users to the roster page immediately.
router.post("/", async (req, res, next) => {
	
	let nm = req.body.name;
	try {
		let usr = await (await db.retrieveUser(nm)).rows[0];
		console.log(usr)
		if(auth.validateHash(auth.validateHash(usr.hash, usr.salt, usr.iter, req.body.password))) {
			res.redirect("/status");
		}
	} catch (e) {
		console.error(e)
		next(110)
	}
});

/* ! will be used for changing passwords
router.post("/x", async (req, res) => {
	let [f, l] = req.body.name.split(".");
	if(!req.body.password) throw 491;
	let hashNshit = auth.hash(req.body.password);
	try {
		console.log(db.changePassword(req.body.name, hashNshit));
	} catch (e) {
		//prolly figure out my legit error handling shitchiachon
		console.log("error");
	}
}) */

module.exports = router;
