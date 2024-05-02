import { Customer, validateCustomer } from "./customer.model.js";

// Middleware
export async function findAll(req, res) {
	try {
		const customers = await Customer.find().sort("name");
		res.send(customers);
	} catch (error) {
		res.status(500).send("Error retrieving Customers.");
	}
}

export async function findById(req, res) {
	try {
		const customer = await Customer.findById(req.params.id);
		if (!customer) {
			return res.status(404).send("The Customer with the given ID was not found.");
		}
		res.send(customer);
	} catch (error) {
		res.status(500).send("Error finding the Customer.");
	}
}

export async function create(req, res) {
	const { error } = validateCustomer(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let customer = new Customer({
		name: req.body.name,
		isGold: req.body.isGold,
		phone: req.body.phone,
	});
	try {
		customer = await customer.save();
		res.send(customer);
	} catch (error) {
		res.status(500).send("Error saving the Customer.");
	}
}

export async function update(req, res) {
	const { error } = validateCustomer(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	try {
		const customer = await Customer.findByIdAndUpdate(
			req.params.id,
			{
				name: req.body.name,
				isGold: req.body.isGold,
				phone: req.body.phone,
			},
			{ new: true },
		);
		if (!customer) {
			return res.status(404).send("The Customer with the given ID was not found.");
		}
		res.send(customer);
	} catch (error) {
		res.status(500).send("Error updating the Customer.");
	}
}

export async function deleteCustomer(req, res) {
	try {
		const customer = await Customer.findByIdAndDelete(req.params.id);
		if (!customer) {
			return res.status(404).send("The Customer with the given ID was not found.");
		}
		res.send(customer);
	} catch (error) {
		res.status(500).send("Error deleting the Customer.");
	}
}
