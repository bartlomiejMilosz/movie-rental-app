import mongoose from "mongoose";
import {Customer} from "../customer/customer.model.js";
import {Movie} from "../movie/movie.model.js";
import {Rental} from "./rental.model.js";
import {DatabaseError} from "../../errors/DatabaseError.js";
import {NotFoundError} from "../../errors/NotFoundError.js";

class RentalService {
	async findAllRentals() {
		try {
			const rentals = await Rental.find().sort("-dateOut");
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
			console.error(`Error retrieving rental with ID ${rentalId}`, error);
			throw new DatabaseError("Database error occurred while retrieving rental");
		}
	}

	async saveRental(customerId, movieId, dateOut, rentalFee) {
		const session = await mongoose.startSession();
		try {
			session.startTransaction();
			const customer = await Customer.findById(customerId).session(session);
			if (!customer) {
				throw new NotFoundError("Invalid customer.");
			}

			const movie = await Movie.findById(movieId).session(session);
			if (!movie) {
				throw new NotFoundError("Invalid movie.");
			}

			if (movie.numberInStock === 0) {
				throw new NotFoundError("Movie not in stock.");
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
			throw error; // Let's ensure the error is caught in the controller
		} finally {
			await session.endSession();
		}
	}
}

export default new RentalService();
