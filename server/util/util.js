class utils {
	/*authenticateClearance(req, res, next) {
		if (req.body.token.clearanceLevel < 3) {
			throw { code: 113 };
		} else
			next()
	}*/
	
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