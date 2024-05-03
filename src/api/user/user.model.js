import Joi from "joi";
import mongoose from "mongoose";
import passwordComplexity from "joi-password-complexity";
import jwt from "jsonwebtoken";
import config from "config";

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

userSchema.methods.generateAuthToken = function() {
	return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get("jwtPrivateKey"));
}

export const User = mongoose.model("User", userSchema);

export const complexityOptions = {
	min: 5,  // Minimum length 5 characters
	max: 72, // Maximum length 72 characters, accommodating bcrypt hash
	lowerCase: 1, // At least one lowercase letter
	upperCase: 1, // At least one uppercase letter
	numeric: 1,   // At least one number
	symbol: 1,    // At least one symbol
	requirementCount: 4, // Must meet at least four of the above conditions
};

const userSchemaJoi = Joi.object({
	name: Joi.string().min(5).max(50).required(),
	email: Joi.string().min(5).max(255).required().email(),
	password: passwordComplexity(complexityOptions, "Password").required(),
});

export function validateUser(user) {
	return userSchemaJoi.validate(user);
}
