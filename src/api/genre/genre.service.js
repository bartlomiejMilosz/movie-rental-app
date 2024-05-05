import {Genre} from "./genre.model.js";
import {NotFoundError} from "../../errors/NotFoundError.js";
import {DatabaseError} from "../../errors/DatabaseError.js";

class GenreService {
	async findAllGenres(page = 1, limit = 10) {
		try {
			const genres = await Genre.find()
				.sort({ name: 1 })
				.skip((page - 1) * limit)
				.limit(limit);
			if (genres.length === 0) {
				throw new NotFoundError("No genres found");
			}
			return genres;
		} catch (error) {
			console.error("Database operation failed", error);
			throw new DatabaseError("Failed to fetch genres");
		}
	}

	async findGenreById(genreId) {
		try {
			const genre = await Genre.findById(genreId);
			if (!genre) {
				throw new NotFoundError(`Genre with ID ${genreId} not found`);
			}
			return genre;
		} catch (error) {
			console.error(
				`Error retrieving genre with ID: ${genreId}, ${error.message}`,
				error,
			);
			throw new DatabaseError("Database error occurred while retrieving genre");
		}
	}

	async saveGenre(genre) {
		let savedGenre = new Genre({
			name: genre.name,
		});

		try {
			savedGenre = await savedGenre.save();
			return savedGenre;
		} catch (error) {
			console.error(`Error saving genre: ${error.message}`, error);
			throw new DatabaseError("Database error occurred while saving genre");
		}
	}

	async updateGenre(genreId, genre) {
		try {
			const updatedGenre = await Genre.findByIdAndUpdate(
				genreId,
				{ name: genre.name },
				{ new: true },
			);
			if (!updatedGenre) {
				throw new NotFoundError(`Genre with ID ${genreId} not found`);
			}
			return updatedGenre;
		} catch (error) {
			console.error(`Error updating genre: ${error.message}`, error);
			throw new DatabaseError("Database error occurred while updating genre");
		}
	}

	async deleteGenre(genreId) {
		try {
			const genre = await Genre.findByIdAndDelete(genreId);
			if (!genre) {
				throw new NotFoundError(`Genre with ID ${genreId} not found`);
			}
			return genre;
		} catch (error) {
			console.error(`Error deleting genre: ${error.message}`, error);
			throw new DatabaseError("Database error occurred while deleting genre");
		}
	}
}

export default new GenreService();
