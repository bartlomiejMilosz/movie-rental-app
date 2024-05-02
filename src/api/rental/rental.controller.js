import {Rental, validateRental} from "./rental.model.js";
import rentalService from "./rental.service.js";

export async function findAll(req, res) {
	try {
		const rentals = await Rental.find().sort("-dateOut");
		res.send(rentals);
	} catch (error) {
		res.status(500).send("Error retrieving rentals.", error.message);
	}
}

export async function save(req, res) {
	try {
		const { error } = validateRental(req.body);
		if (error) {
			return res.status(400).send(error.details[0].message);
		}

		const rental = await rentalService.createRental(
			req.body.customerId,
			req.body.movieId,
			req.body.dateOut,
			req.body.rentalFee
		);
		res.send(rental);
	} catch (error) {
		res.status(500).send(`Failed to save rental: ${error.message}`);
	}
}

export async function findById(req, res) {
	try {
		const rental = await Rental.findById(req.params.id);
		if (!rental) {
			return res.status(404).send("The rental with the given ID was not found.");
		}
		res.send(rental);
	} catch (error) {
		res.status(500).send("Error finding the rental.");
	}
}
