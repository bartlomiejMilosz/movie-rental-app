import {User} from "./user.model.js";

export async function findAll(req, res) {
	try {
		const users = await User.find().select("name");
		res.send(users);
	} catch (error) {
		res.status(500).send("Error retrieving users.", error.message);
	}
}
