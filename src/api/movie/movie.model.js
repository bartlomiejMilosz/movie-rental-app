import mongoose from "mongoose";
import Joi from "joi";

export const movieSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
		minlength: 5,
		maxlength: 255,
	},
	// referenced
	genres: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Genre",
			required: true,
		},
	],
	// embedded
	// genre: [GenreSchema],
	numberInStock: {
		type: Number,
		required: true,
		min: 0,
	},
	dailyRentalRate: {
		type: Number,
		required: true,
		min: 0,
	},
});

export const Movie = mongoose.model("Movie", movieSchema);

// Custom validator for MongoDB ObjectId
const objectIdValidator = (value, helpers) => {
	if (!mongoose.Types.ObjectId.isValid(value)) {
		return helpers.error("any.invalid");
	}
	return value;
};

const movieSchemaJoi = Joi.object({
	title: Joi.string().min(5).max(255).required().trim(),
	genres: Joi.array()
		.items(Joi.string().custom(objectIdValidator, "Object ID Validation"))
		.min(1)
		.required(),
	numberInStock: Joi.number().min(0).required(),
	dailyRentalRate: Joi.number().min(0).required(),
});

export function validateMovie(movie) {
	return movieSchemaJoi.validate(movie);
}
