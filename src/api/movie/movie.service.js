import {NotFoundError} from "../../errors/NotFoundError.js";
import {DatabaseError} from "../../errors/DatabaseError.js";
import {Movie} from "./movie.model.js";

class MovieService {
	async findAllMovies(page = 1, limit = 10) {
		try {
			const movies = await Movie.find()
				.sort({ title: 1 })
				.skip((page - 1) * limit)
				.limit(limit);
			if (movies.length === 0) {
				throw new NotFoundError("No movies found");
			}
			return movies;
		} catch (error) {
			console.error("Database operation failed", error);
			throw new DatabaseError("Failed to fetch movies");
		}
	}

	async findMovieById(movieId, session = null) {
		try {
			const query = Movie.findById(movieId);
			if (session) {
				query.session(session);
			}
			const movie = await query;
			if (!movie) {
				throw new NotFoundError(`Movie with ID ${movieId} not found`);
			}
			return movie;
		} catch (error) {
			console.error(
				`Error retrieving movie with ID: ${movieId}, ${error.message}`,
				error,
			);
			throw new DatabaseError("Database error occurred while retrieving movie");
		}
	}

	async saveMovie(movie) {
		let savedMovie = new Movie({
			title: movie.title,
			genres: movie.genres,
			numberInStock: movie.numberInStock,
			dailyRentalRate: movie.dailyRentalRate,
		});

		try {
			savedMovie = await savedMovie.save();
			return savedMovie;
		} catch (error) {
			console.error(`Error saving movie: ${error.message}`, error);
			throw new DatabaseError("Database error occurred while saving movie");
		}
	}

	async updateMovie(movieId, movie) {
		try {
			const updatedMovie = await Movie.findByIdAndUpdate(
				movieId,
				{
					title: movie.title,
					genres: movie.genres,
					numberInStock: movie.numberInStock,
					dailyRentalRate: movie.dailyRentalRate,
				},
				{ new: true, runValidators: true },
			);
			if (!updatedMovie) {
				throw new NotFoundError(`Movie with ID ${genreId} not found`);
			}
			return updatedMovie;
		} catch (error) {
			console.error(`Error updating movie: ${error.message}`, error);
			throw new DatabaseError("Database error occurred while updating movie");
		}
	}

	async updateMovieGenre(movieId, movieGenre) {
		try {
			const updatedMovieGenre = await Movie.findByIdAndUpdate(
				movieId,
				{ genres: movieGenre },
				{ new: true, runValidators: true },
			);
			if (!updatedMovieGenre) {
				throw new NotFoundError(`Movie with ID ${genreId} not found`);
			}
			return updatedMovieGenre;
		} catch (error) {
			console.error(`Error updating movie genre: ${error.message}`, error);
			throw new DatabaseError("Database error occurred while updating movie genre");
		}
	}

	async deleteMovie(movieId) {
		try {
			const movie = await Movie.findByIdAndDelete(movieId);
			if (!movie) {
				throw new NotFoundError(`Movie with ID ${genreId} not found`);
			}
			return movie;
		} catch (error) {
			console.error(`Error deleting movie: ${error.message}`, error);
			throw new DatabaseError("Database error occurred while deleting movie");
		}
	}
}

export default new MovieService();