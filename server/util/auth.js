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
}

module.exports = new auth();