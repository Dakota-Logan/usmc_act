let express = require('express');
let router  = express.Router();

let path = require("path");

/* GET home page. */
router.get('/', (req, res, next) => {
	res.sendFile(path.join(__dirname + "/../views/html/home.html"));
});

router.post("/", (req, res, next) => {
	let email = req.body.email,
		pwd = req.body.password;
	
	//check for user and auth
	//return good jwt
	//return no_user error
});

module.exports = router;
