const express = require('express'),
	  router  = express.Router()
	  // db      = require("./db.js");

let path = require("path");

/* GET home page. */
router.get('/', (req, res, next) => {
	res.sendFile(path.join(__dirname + "/../views/html/home.html"));
});

//todo add this code to redirect clearancelevel >=3 to the roster page:
// if () {
// 	res.redirect("/roster");
// } else
// 	next();

//todo Add the pathing that pushes admin users to the roster page immediately.

router.post("/", (req, res, next) => {
	let email = req.body.email,
		pwd   = req.body.password;
	
	//check for user and auth
	//return good jwt
	//return no_user error
});

module.exports = router;
