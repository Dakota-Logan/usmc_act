const express = require('express'),
	  router  = express.Router();
	  // db      = require("./db.js"),

let path = require("path"),
	curPath = __dirname + "/../views/html/";

router.get('/', ( req, res, next ) => {
	res.sendFile(path.join(curPath+"roster.html"));
});

/* ! change da pw
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