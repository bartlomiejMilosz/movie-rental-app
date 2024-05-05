import {validateCustomer} from "./customer.model.js";
import customerService from "./customer.service.js";

export async function findAllCustomers(req, res, next) {
	try {
		const page = Number.parseInt(req.query.page) || 1;
		const limit = Number.parseInt(req.query.limit) || 10;
		const customers = await customerService.findAllCustomers(page, limit);
		res.send(customers);
	} catch (error) {
		next(error);
	}
}

export async function findCustomerById(req, res, next) {
	try {
		const customer = await customerService.findCustomerById(req.params.id);
		res.send(customer);
	} catch (error) {
		next(error);
	}
}

export async function saveCustomer(req, res, next) {
	const customer = req.body;
	try {
		const validationResult = validateCustomer(req.body);
		if (validationResult.error) {
			validationResult.error.status = 400;
			throw validationResult.error;
		}

		const savedCustomer = await customerService.saveCustomer(customer);
		res.status(201).send(savedCustomer);
	} catch (error) {
		next(error);
	}
}

export async function updateCustomer(req, res, next) {
	const customerId = req.params.id;
	const customer = req.body;

	try {
		const validationResult = validateCustomer(customer);
		if (validationResult.error) {
			validationResult.error.status = 400;
			throw validationResult.error;
		}

		const updatedCustomer = await customerService.updateCustomer(
			customerId,
			customer,
		);
		res.status(200).send(updatedCustomer);
	} catch (error) {
		next(error);
	}
}

export async function deleteCustomer(req, res, next) {
	const customerId = req.params.id;

	try {
		const customer = await customerService.deleteCustomer(customerId);
		res.status(200).send(customer);
	} catch (error) {
		next(error);
	}
}
