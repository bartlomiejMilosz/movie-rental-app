import jwt from "jsonwebtoken";
import config from "config";

export function adminAuth(req, res, next) {
	if (!req.user.isAdmin) {
		return res.status(403).send("Access denied. You must be logged in as an administrator to move forward");
	}
	next();
	try {
		//req.user = jwt.verify(token, config.get("jwtPrivateKey"));
		//next();
	} catch (error) {
		res.status(400).send(`Invalid token.: ${error.message}`);
	}
}
