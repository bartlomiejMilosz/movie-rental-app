import {validateUser} from "../../api/user/user.model.js";

export function validateUserMiddleware(req, res, next) {
	const { error } = validateUser(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}
	next();
}
