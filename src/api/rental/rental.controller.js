import {Rental, validateRental} from "./rental.model.js";
import {Customer} from "../customer/customer.model.js";
import {Movie} from "../movie/movie.model.js";

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

		const customer = await Customer.findById(req.body.customerId);
		if (!customer) {
			return res.status(400).send("Invalid customer.");
		}

		const movie = await Movie.findById(req.body.movieId);
		if (!movie) {
			return res.status(400).send("Invalid movie.");
		}

		if (movie.numberInStock === 0) {
			return res.status(400).send("Movie not in stock.");
		}

		// Make sure to create a complete movie object
		let rental = new Rental({
			customer: {
				_id: customer._id,
				name: customer.name,
				phone: customer.phone,
				isGold: customer.isGold
			},
			movie: {
				_id: movie._id,
				title: movie.title,
				dailyRentalRate: movie.dailyRentalRate,
				numberInStock: movie.numberInStock,
				genres: movie.genres
			},
			dateOut: req.body.dateOut || new Date(),
			rentalFee: req.body.rentalFee || 0
		});
		rental = await rental.save();

		movie.numberInStock--;
		await movie.save();  // save the updated movie document

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
