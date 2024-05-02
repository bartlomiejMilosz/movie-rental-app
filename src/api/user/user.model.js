import Joi from "joi";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50,
	},
	email: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 255,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 72, // Sufficient for bcrypt
	},
	isAdmin: Boolean,
});

export const User = mongoose.model("User", userSchema);

const userSchemaJoi = Joi.object({
	name: Joi.string().min(5).max(50).required(),
	email: Joi.string().min(5).max(255).required().email(),
	password: Joi.string().min(5).max(72).required(),
});

export function validateUser(user) {
	return userSchemaJoi.validate(user);
}
