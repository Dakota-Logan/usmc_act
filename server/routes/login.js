const express = require('express'),
	  router  = express.Router(),
	  db      = require("../util/db.js"),
	  auth    = require("../util/auth"),
	  jwt     = require("../util/jwt_utils"),
	  util    = require("../util/util");

let path    = require("path"),
	curPath = __dirname + "/../views/html";

/* GET home page. */
router.get('/', (req, res) => {
	res.sendFile(path.join(curPath + "/login.html"));
});

//todo Add the pathing that pushes admin users to the roster page immediately.
router.post("/", async (req, res, next) => {
	let nm = req.body.name;
	try {
		let usr = (await
			db.retrieveUser(nm)).rows[0];
		if (auth.validateHash(usr.hash, usr.salt, usr.iter, req.body.password)) {
			util.setCookie(res, "jwt", jwt.createToken({ admin: usr.admin || 0, id: usr.id }));
			res.redirect("/status");
		}
	} catch (e) {
		if(e.code !== 193) next(110)
		console.error(e)
		throw e
	}
});


module.exports = router;
