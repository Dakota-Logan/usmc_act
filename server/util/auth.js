class auth {
	crypto = require("crypto");
	jwt    = require("jsonwebtoken");
	
	constructor() {
		this.iterations = 10000;
	}
	
	
	hash(pw) {
		let salt = this.crypto.randomBytes(64).toString("base64");
		return {
			salt,
			iter: this.iterations,
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
	
	authenticate(req, res, next, au = false) {
		let token = req.cookies.jwt || false;
		
		if (!(token && jwt.verifyToken(token))) {
			console.log("no jwt")
			let e = {statusCode: 401}
			throw e;
		}
		//*	 Get and set the important information into the body of the request.
		let dToken      = jwt.decodeToken(token);
		req.body.admin  = dToken.data.admin;
		req.body.userId = dToken.data.id;
		if (!au) next();
	}
	
	authorize(req, res, next) {
		this.authenticate(req, res, next)
		if (req.body.admin !== true) {
			console.log("no jwt")
			let e        = new Error()
			e.statusCode = 401;
			throw e
		} else next();
	}
}


module.exports = new auth();