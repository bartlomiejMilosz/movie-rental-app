import {Customer} from "../customer/customer.model.js";
import {Movie} from "../movie/movie.model.js";
import {Rental} from "./rental.model.js";


class RentalService {
	async createRental(customerId, movieId, dateOut, rentalFee) {
		const customer = await Customer.findById(customerId);
		if (!customer) {
			throw new Error("Invalid customer.");
		}

		const movie = await Movie.findById(movieId);
		if (!movie) {
			throw new Error("Invalid movie.");
		}

		if (movie.numberInStock === 0) {
			throw new Error("Movie not in stock.");
		}

		const rental = new Rental({
			customer: {
				_id: customer._id,
				name: customer.name,
				phone: customer.phone,
				isGold: customer.isGold,
			},
			movie: {
				_id: movie._id,
				title: movie.title,
				dailyRentalRate: movie.dailyRentalRate,
				numberInStock: movie.numberInStock,
				genres: movie.genres,
			},
			dateOut: dateOut || new Date(),
			rentalFee: rentalFee || 0,
		});

		await rental.save();
		movie.numberInStock--;
		await movie.save();

		return rental;
	}
}

export default new RentalService();
