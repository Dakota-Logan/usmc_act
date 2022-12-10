class jwt_utils {
	jwt = require("jsonwebtoken");
	
	createToken(data) {
		try {
			return this.jwt.sign({
				data: { clearanceLevel: data["clearanceLevel"] || 0, id: data.id }
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
}

module.exports = new jwt_utils();