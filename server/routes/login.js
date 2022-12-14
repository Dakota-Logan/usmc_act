const express = require('express'),
	  router  = express.Router()
	  // db      = require("./db.js");

let path = require("path"),
	curPath = __dirname + "/../views/html/";

/* GET home page. */
router.get('/', (req, res, next) => {
	console.log("in login GET")
	res.sendFile(path.join(curPath+"login.html"));
});


//todo Add the pathing that pushes admin users to the roster page immediately.
router.post("/", (req, res, next) => {
	let email = req.body.email,
		pwd   = req.body.password;
	
	//check for user and auth
	//return good jwt
	//return no_user error
});

//CSS
router.get('/login.css', function(req, res) {
	console.log("css path")
	res.sendFile(path.join(curPath+"../../public/stylesheets/login.css"));
});

module.exports = router;
