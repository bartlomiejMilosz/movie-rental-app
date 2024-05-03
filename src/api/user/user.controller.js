import {User, validateUser} from "./user.model.js";
import _ from "lodash";
import bcrypt from "bcrypt";

export async function signUp(req, res) {
	const { error } = validateUser(req.body);
	if (error) {
		return res.status(400).send(error.message);
	}

	let user = await User.findOne({ email: req.body.email });
	if (user) {
		return res.status(400).send("User already registered.");
	}

	// user = new User(_.pick(req.body, ["name", "email", "password"]));
	user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
	});
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);

	try {
		user = await user.save();
		const token = user.generateAuthToken;
		res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
		//res.send(_.pick(user, ["_id", "name", "email"])); - WORKING WITH THIS
	} catch (error) {
		console.error("Error saving the user: ", error.message);
		res.status(500).send(`Error saving the User: ${error.message}`);
	}
}
