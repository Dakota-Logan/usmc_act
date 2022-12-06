class auth {
	#db         = require("./db.js");
	#iterations = 10000;
	#jwt = require("jsonwebtoken");
	
	
	hash(password) {
		return {
			salt: crypto.randomBytes(128).toString("base64"),
			iter: this.#iterations,
			hash: crypto.pbkdf2(password, this.salt, this.#iterations).toString("base64")
		}
	}
	
	validateHash(savedHash, savedSalt, savedIterations, passwordAttempt) {
		return savedHash === crypto.pbkdf2(passwordAttempt, savedSalt, savedIterations).toString("base64");
	}
	
	authenticateToken(req, res, next) {
		let token = req.body()
		console.log(JSON.stringify(req.body));
		if (token == null) return res.sendStatus(401)
		
		this.#jwt.verify(token, process.env.secret.toString(), (err, user) => {
			console.log(err)
			
			if (err) return res.sendStatus(403)
			
			req.user = user
			
			next()
		})
	}
	authenticateClearance (req, res, next) {
		//todo Find a way to add a clearance header to the jwt and only allow clearance level 3+ access to this.
		if(clearanceLevel < 3){
			throw Error({code: 113})
		} else
			next()
	}
}

module.exports = new auth();