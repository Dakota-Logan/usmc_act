const express = require('express'),
	  router  = express.Router()
	  // db      = require("./db.js");

let path = require("path");

router.use(req => console.log(req.body));

/* GET home page. */
router.get('/', (req, res, next) => {
	console.log("in login GET")
	res.sendFile(path.join(__dirname + "/../views/html/home.html"));
});

//todo Add the pathing that pushes admin users to the roster page immediately.
router.post("/", (req, res, next) => {
	let email = req.body.email,
		pwd   = req.body.password;
	
	//check for user and auth
	//return good jwt
	//return no_user error
});

module.exports = router;
