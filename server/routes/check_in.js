const express = require('express'),
	  router  = express.Router();

let path      = require("path"),
	curPath   = __dirname + "/../views/html";


router.get('/', (req, res, next) => {
console.log("inside check_in.js GET")
	
	res.sendFile(path.join(curPath+"/checkin.html"));
});

router.post("/checkin")
router.post("/checkout")

module.exports = router;
