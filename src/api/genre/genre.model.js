import Joi from "joi";
import mongoose from "mongoose";

export const GenreSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50,
	},
});

export const Genre = mongoose.model("Genre", GenreSchema);

// Joi schema for genre validation using the latest version of Joi
export const validateGenre = Joi.object({
	name: Joi.string().min(5).max(50).required(),
});
