import Joi from "joi";
import mongoose from "mongoose";
import {customerSchema} from "../customer/customer.model.js";
import {movieSchema} from "../movie/movie.model.js";

const rentalSchema = new mongoose.Schema({
	customer: {
		type: customerSchema,
		required: true,
	},
	movie: {
		type: movieSchema,
		required: true,
	},
	dateOut: {
		type: Date,
		required: true,
		default: Date.now,
	},
	dateReturned: {
		type: Date,
	},
	rentalFee: {
		type: Number,
		min: 0,
	},
});

export const Rental = mongoose.model("Rental", rentalSchema);

const rentalSchemaJoi = Joi.object({
	customerId: Joi.string().required(),
	movieId: Joi.string().required(),
});

export function validateRental(rental) {
	return rentalSchemaJoi.validate(rental);
}
