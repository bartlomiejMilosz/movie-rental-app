import Joi from "joi";
import mongoose from "mongoose";
import {customerSchema} from "../customer/customer.model.js";
import {movieSchema} from "../movie/movie.model.js";

//TODO consider reference relation instead of embedded between rental, customer and movie
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

const objectIdValidator = (value, helpers) => {
	if (!mongoose.Types.ObjectId.isValid(value)) {
		return helpers.error("any.invalid");
	}
	return value;
};

const rentalSchemaJoi = Joi.object({
	customerId: Joi.string().custom(objectIdValidator, 'Object ID Validation').required(),
	movieId: Joi.string().custom(objectIdValidator, 'Object ID Validation').required(),
	dateOut: Joi.date().required(),
	dateReturned: Joi.date().greater(Joi.ref('dateOut')).allow(null),
	rentalFee: Joi.number().min(0)
});

export function validateRental(rental) {
	return rentalSchemaJoi.validate(rental);
}
