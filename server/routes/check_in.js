const express = require('express'),
	  router  = express.Router();

let path      = require("path"),
	curPath   = __dirname + "/../views/html/";

router.get('/', (req, res, next) => {
	res.sendFile(path.join(curPath+"checkin.html"));
});


module.exports = router;
