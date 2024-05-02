import Joi from "joi";
import mongoose from "mongoose";

export const customerSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50,
	},
	isGold: {
		type: Boolean,
		default: false,
	},
	phone: {
		type: String,
		required: true,
		validate: {
			validator: (v) => {
				return v.length === 9 && /^\d+$/.test(v);
			},
			message: (props) => `${props.value} is not a valid 9-digit phone number!`,
		},
	},
});

export const Customer = mongoose.model("Customer", customerSchema);

const customerSchemaJoi = Joi.object({
	name: Joi.string().min(5).required(),
	isGold: Joi.boolean().required(),
	phone: Joi.string().length(9).pattern(/^\d+$/).required(),
});

export function validateCustomer(customer) {
	return customerSchemaJoi.validate(customer);
}
