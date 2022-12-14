const express = require('express'),
	  router  = express.Router();
	  // db      = require("./db.js"),

let path = require("path"),
	curPath = __dirname + "/../views/html/";

router.get('/', ( req, res, next ) => {
	res.sendFile(path.join(curPath+"roster.html"));
});

module.exports = router;