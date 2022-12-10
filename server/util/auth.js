class auth {
	#db         = require("./db.js");
	#iterations = 10000;
	#jwt        = require("jsonwebtoken");

	
	hash(password) {
		return {
			salt: crypto.randomBytes(128).toString("base64"),
			iter: this.#iterations,
			hash: crypto.pbkdf2(password, this.salt, this.#iterations, 64, "sha512").toString("base64")
		}
	}
	
	
	validateHash(savedHash, savedSalt, savedIterations, passwordAttempt) {
		return savedHash === crypto.pbkdf2(passwordAttempt, savedSalt, savedIterations).toString("base64");
	}
}

module.exports = new auth();