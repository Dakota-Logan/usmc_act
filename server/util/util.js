class utils {
	/*authenticateClearance(req, res, next) {
		if (req.body.token.clearanceLevel < 3) {
			throw { code: 113 };
		} else
			next()
	}*/
	
	setCookie(res, key, val) {
		try {
			res.cookie(key.toString(), val.toString(), { signed: false, secure: false });
		} catch (e) {
			console.error(e);
			throw { code: 193 }
		}
	}
	
}

module.exports = new utils();