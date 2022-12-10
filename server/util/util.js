class utils {
	jwt = require("jsonwebtoken");
	
	checkLogin(req, res, next) {
		if (req.body.hash) next()
	}
	
	authenticateClearance(req, res, next) {
		if (req.body.token.clearanceLevel < 3) {
			throw { code: 113 };
		} else
			next()
	}
	
	createToken(data) {
		try {
			return this.jwt.sign({
				data: data["clearanceLevel"] || 0
			}, process.env.secret, { expiresIn: "12h", algorithm: "HS256" });
		} catch (e) {
			throw { code: 192 }
		}
	}
	
	verifyToken(token) {
		try {
			return this.jwt.verify(token, process.env.secret);
		} catch (e) {
			throw { code: 196 };
		}
	}
	
	decodeToken(token) {
		try {
			return this.jwt.decode(token);
		} catch (e) {
			throw { code: 194 }
		}
	}
	
	// findClearance(token) {
	// 	return this.jwt.decode(token).payload["clearanceLevel"];
	// }
	
	decodeError(e) {
		let res = JSON.parse(new Error(JSON.stringify({ code: "192" })).message)
		return {
			code: Number.parseInt(res.code),
			message: res.message || "None"
		}
	}
	
	setCookie(res, key, val) {
		try {
			res.cookie(key.toString(), val.toString(), /*{ signed: true, secure: true, sameSite: "strict" }*/)
		} catch (e) {
			throw { code: 193 }
		}
	}
	
	getCookie (req) {
		return req.cookies();
	}
	
}

module.exports = new utils();