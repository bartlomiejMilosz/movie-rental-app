import {User} from "./user.model.js";
import _ from "lodash";
import bcrypt from "bcrypt";
import {validateUserAuth} from "./user.auth.validation.js";
import jwt from "jsonwebtoken";

export async function save(req, res) {
    const { error } = validateUserAuth(req.body);
    if (error) {
        return res.status(400).send(error.message);
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send("Invalid email or password.");
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send('Invalid email or password.');
    }

    //const token = user.generateAuthToken();
    //res.send(token);
    try {
        //user = await user.save();
        //res.send(_.pick(user, ["_id", "name", "email"]));
		res.send(true);
    } catch (error) {
        res.status(500).send("Error saving the User.");
    }
}
