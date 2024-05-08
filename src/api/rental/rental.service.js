import mongoose from "mongoose";
import {Rental} from "./rental.model.js";
import {DatabaseError} from "../../errors/DatabaseError.js";
import {NotFoundError} from "../../errors/NotFoundError.js";
import customerService from "../customer/customer.service.js";
import movieService from "../movie/movie.service.js";

class RentalService {
	async findAllRentals(page = 1, limit = 10) {
		try {
			const rentals = await Rental.find()
				.skip((page - 1) * limit)
				.limit(limit);
			if (rentals.length === 0) {
				throw new NotFoundError("No rentals found");
			}
			return rentals;
		} catch (error) {
			console.error("Database operation failed", error);
			throw new DatabaseError("Failed to fetch rentals");
		}
	}

	async findRentalById(rentalId) {
		try {
			const rental = await Rental.findById(rentalId);
			if (!rental) {
				throw new NotFoundError(`Rental with ID ${rentalId} not found`);
			}
			return rental;
		} catch (error) {
			console.error(
				`Error retrieving rental with ID: ${rentalId}, ${error.message}`,
				error,
			);
			throw new DatabaseError("Database error occurred while retrieving rental");
		}
	}

	async saveRental(customerId, movieId, dateOut, rentalFee) {
		const session = await mongoose.startSession();
		session.startTransaction();
		try {
			const customer = await customerService.findCustomerById(customerId, session);
			const movie = await movieService.findMovieById(movieId, session);

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
			session.endSession();
			return rental;
		} catch (error) {
			await session.abortTransaction();
			session.endSession();
			console.error("Transaction error: ", error);
			throw error; // Enhanced error handling
		}
	}
}

export default new RentalService();
