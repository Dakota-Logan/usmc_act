const express = require('express'),
	  router  = express.Router(),
	  db      = require("./db.js"),
	  path    = require("path");

router.get('/', ( req, res, next ) => {
	res.sendFile(path.join(__dirname + "./../views/html/roster.html"));
});

module.exports = router;