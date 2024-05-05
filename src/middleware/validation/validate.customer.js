import { validateCustomer } from "../../api/customer/customer.model.js";

export function validateCustomerMiddleware(req, res, next) {
	const { error } = validateCustomer(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}
	next();
}
