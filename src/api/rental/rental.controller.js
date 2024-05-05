import {validateRental} from "./rental.model.js";
import rentalService from "./rental.service.js";

export async function findAllRentals(req, res, next) {
	try {
		const rentals = await rentalService.findAllRentals();
		res.send(rentals);
	} catch (error) {
		next(error);
	}
}

export async function findRentalById(req, res, next) {
	try {
		const rental = await rentalService.findRentalById(req.params.id);
		res.send(rental);
	} catch (error) {
		next(error);
	}
}

export async function saveRental(req, res, next) {
	const { customerId, movieId, dateOut, rentalFee } = req.body;
	try {
		const validationResult = validateRental(req.body);
		if (validationResult.error) {
			validationResult.error.status = 400;
			throw validationResult.error;
		}

		const rental = await rentalService.saveRental(
			customerId,
			movieId,
			dateOut,
			rentalFee,
		);
		res.send(rental);
	} catch (error) {
		next(error);
	}
}
