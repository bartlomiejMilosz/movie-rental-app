import {User, validateUser} from "./user.model.js";
import _ from "lodash";
import bcrypt from "bcrypt";

export async function save(req, res) {
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
		// res.send(_.pick(user, ["_id", "name", "email"]));
		res.send({
			name: user.name,
			email: user.email
		});
	} catch (error) {
		res.status(500).send("Error saving the User.");
	}
}
