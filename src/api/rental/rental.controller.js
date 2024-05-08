import rentalService from "./rental.service.js";

export async function findAllRentals(req, res, next) {
	try {
		const page = Number.parseInt(req.query.page) || 1;
		const limit = Number.parseInt(req.query.limit) || 10;
		const rentals = await rentalService.findAllRentals(page, limit);
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
		const rental = await rentalService.saveRental(
			customerId,
			movieId,
			dateOut,
			rentalFee,
		);
		res.status(201).send(rental);
	} catch (error) {
		next(error);
	}
}
