class auth {
	crypto   = require("crypto");
	jwtUtils = require("./jwt_utils.js");
	
	
	hash(pw) {
		let salt = this.crypto.randomBytes(64).toString("base64");
		return {
			salt,
			iter: Math.abs(Math.floor(Math.random() * (100 - 100000) + 100)),
			hash: this.crypto.pbkdf2Sync(pw, salt, this.iterations, 64, "sha512").toString("base64")
		}
	}
	
	validateHash(savedHash, savedSalt, savedIterations, passwordAttempt) {
		// return
		let pa = passwordAttempt,
			ss = savedSalt;
		try {
			return this.crypto.pbkdf2Sync(pa, ss, savedIterations, 64, "sha512").toString("base64") === savedHash;
		} catch (e) {
			console.error(e);
		}
	}
	
	authenticate(req, res, next) {
		let token = req.cookies.jwt || false;
		
		if (!(token && jwtUtils.verifyToken(token))) {
			res.redirect("/");
		}
		//*	 Get and set the important information into the body of the request.
		let dToken      = jwtUtils.decodeToken(token);
		req.body.admin  = dToken.data.admin;
		req.body.userId = dToken.data.id;
		next();
	}
	
	authorize(req, res, next) {
		if (req.body.admin !== true) {
			res.redirect("/status");
		} else next();
	}
}


module.exports = new auth();