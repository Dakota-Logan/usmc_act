class auth {
	constructor() {
		this.iterations = 10000;
		this.jwt        = require("jsonwebtoken");
		this.crypto     = require("crypto");
	}
	
	
	hash(password) {
		let salt = this.crypto.randomBytes(64).toString("base64");
		return {
			salt,
			iter: this.iterations,
			hash: this.crypto.pbkdf2Sync(password, salt, this.iterations, 64, "sha512").toString("base64")
		}
	}
	
	
	validateHash(savedHash, savedSalt, savedIterations, passwordAttempt) {
		// return
		return this.crypto.pbkdf2Sync(passwordAttempt, savedSalt, savedIterations, 64, "sha512").toString("base64") === savedHash;
	}
}

module.exports = new auth();