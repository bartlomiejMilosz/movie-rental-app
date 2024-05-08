import jwt from "jsonwebtoken";
import config from "config";

export function userAuth(req, res, next) {
	const token = req.header("x-auth-token");
	if (!token) {
		return res.status(401).send("Access denied. No token provided.");
	}

	try {
		req.user = jwt.verify(token, config.get("jwtPrivateKey"));
		next();
	} catch (error) {
		res.status(400).send(`Invalid token.: ${error.message}`);
	}
}
