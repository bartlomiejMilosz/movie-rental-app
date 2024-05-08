import userService from "./user.service.js";

export async function findById(req, res, next) {
	const userId = req.user._id;
	try {
		const user = await userService.findUserById(userId);
		res.send(user);
	} catch (error) {
		next(error);
	}
}

export async function signUpUser(req, res, next) {
	const userData = req.body;
	try {
		const newUser = await userService.signUpUser(userData);
		const token = newUser.generateAuthToken; // JWT token generation
		res.header("Authorization", `Bearer ${token}`).send({
			_id: newUser._id,
			name: newUser.name,
			email: newUser.email,
		});
	} catch (error) {
		next(error);
	}
}
