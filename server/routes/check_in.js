const express = require("express"),
	  router  = express.Router(),
	  db = require("../util/db");

let path    = require("path"),
	curPath = __dirname + "/../views/html";


router.get("/", (req, res) => {
	res.sendFile(path.join(curPath + "/checkin.html"));
});

router.post("/checkin", (req, res) => {
	console.log(req.body.userId);
	db.check_in(req.body.userId)
});

router.post("/checkout", ((req, res) => {
	let curTime = time(new Date())
	console.log(req.body)
}))

module.exports = router;
