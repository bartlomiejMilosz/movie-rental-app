import mongoose from "mongoose";
import {Customer} from "../customer/customer.model.js";
import {Movie} from "../movie/movie.model.js";
import {Rental} from "./rental.model.js";

class RentalService {
	async createRental(customerId, movieId, dateOut, rentalFee) {
		const session = await mongoose.startSession();
		try {
			session.startTransaction();
			const customer = await Customer.findById(customerId).session(session);
			if (!customer) {
				throw new Error("Invalid customer.");
			}

			const movie = await Movie.findById(movieId).session(session);
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

			await rental.save({ session });
			movie.numberInStock--;
			await movie.save({ session });

			await session.commitTransaction();
			return rental;
		} catch (error) {
			await session.abortTransaction();
			throw error; // Rethrow the error to be handled by the caller
		} finally {
			await session.endSession();
		}
	}
}

export default new RentalService();
