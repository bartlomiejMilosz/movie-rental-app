import jwt from "jsonwebtoken";
import config from "config";

export function adminAuth(req, res, next) {
	// Verify the token
	const token = req.header("Authorization")
		? req.header("Authorization").replace("Bearer ", "")
		: null;
	if (!token) {
		return res.status(401).send("Access denied. No token provided.");
	}

	try {
		// Verify the token and attach the user payload to the request
		const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
		req.user = decoded; // Assuming the token payload includes user details

		// Next, check if the user is an admin
		if (!req.user.isAdmin) {
			return res
				.status(403)
				.send(
					"Access denied. You must be logged in as an administrator to move forward.",
				);
		}

		next(); // Proceed to the next middleware if everything is fine
	} catch (error) {
		res.status(400).send(`Invalid token: ${error.message}`);
	}
}
