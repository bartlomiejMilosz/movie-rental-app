import Joi from "joi";
import mongoose from "mongoose";

export const Genre = mongoose.model(
	"Genre",
	new mongoose.Schema({
		name: {
			type: String,
			required: true,
			minlength: 5,
			maxlength: 50,
		},
	}),
);

// Joi schema for genre validation using the latest version of Joi
export const genreSchema = Joi.object({
	name: Joi.string().min(3).required(),
});
