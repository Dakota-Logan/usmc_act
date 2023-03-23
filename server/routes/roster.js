const express = require("express"),
	router = express.Router(),
	db = require("./../util/db"),
	ejs = require("ejs");

let path = require("path"),
	viewPath = __dirname + "/../views/";

router.get("/", async (req, res, next) => {
	let users = (await db.roster()).rows;
	console.log(users[0])
	res.render(path.join(viewPath + "roster.ejs"), {data : [{rank: "pfc", last: "logan", first: "dakota", in: true, reason: "N/A"}]});
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