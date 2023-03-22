const express = require("express"),
	router = express.Router(),
	db = require("./../util/db");

let path = require("path"),
	htmlPath = __dirname + "/../views/html";

router.get("/", async (req, res, next) => {
	let users = (await db.roster()).rows;
	console.log(users[0])
	res.sendFile(path.join(htmlPath + "/roster.html"));
});


router.post("/update", async (req, res) => {
	let [f, l] = req.body.name.split(".");
	if (!req.body.password) throw 491;
	let hashNshit = auth.hash(req.body.password);
	try {
		console.log(db.changePassword(req.body.name, hashNshit));
	} catch (e) {
		//prolly figure out my legit error handling shitchiachon
		console.log("error");
	}
});

module.exports = router;