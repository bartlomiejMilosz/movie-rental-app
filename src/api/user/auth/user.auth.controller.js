import userAuthService from "./user.auth.service.js";

export async function signInUser(req, res, next) {
	const { email, password } = req.body;
	try {
		const token = await userAuthService.signInUser(email, password);
		res.send(token);
	} catch (error) {
		if (error.message === "Invalid email or password.") {
			res.status(400).send(error.message);
		} else {
			next(error);
		}
	}
}
