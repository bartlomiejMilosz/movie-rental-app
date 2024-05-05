import jwt from "jsonwebtoken";
import config from "config";

export function userAuth(req, res, next) {
	const header = req.header("Authorization");
	if (!header) {
		return res.status(401).send("Access denied. No token provided.");
	}

	const token = header.split(" ")[1];
	if (!token) {
		return res.status(401).send("Access denied. No token provided.");
	}

	try {
		req.user = jwt.verify(token, config.get("jwtPrivateKey"));
		next();
	} catch (error) {
		if (error instanceof jwt.TokenExpiredError) {
			return res.status(401).send("Access denied. Token has expired.");
		}
		if (error instanceof jwt.JsonWebTokenError) {
			return res.status(400).send("Invalid token.");
		}
		return res.status(400).send(`Invalid token: ${error.message}`);
	}
}
