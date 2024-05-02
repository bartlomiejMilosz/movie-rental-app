import {Movie, validateMovie} from "./movie.model.js";

export async function findAll(req, res) {
	try {
		const movies = await Movie.find().sort("title");
		res.send(movies);
	} catch (error) {
		res.status(500).send("Error retrieving movies.", error.message);
	}
}

export async function findById(req, res) {
	try {
		const movie = await Movie.findById(req.params.id);
		if (!movie) {
			return res.status(404).send("The movie with the given ID was not found.");
		}
		res.send(movie);
	} catch (error) {
		res.status(500).send("Error finding the movie.");
	}
}

export async function save(req, res) {
	const { error } = validateMovie(req.body);
	if (error) {
		return res.status(400).send(error.message);
	}

	try {
		let newMovie = new Movie(req.body);
		newMovie = await newMovie.save();
		res.send(newMovie);
	} catch (error) {
		res.status(500).send("Failed to save movie.", error.message);
	}
}

export async function updateMovie(req, res) {
	const { error } = validateMovie(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	try {
		const movie = await Movie.findByIdAndUpdate(req.params.id, {
			title: req.body.title,
			genre: req.body.genres,  // This assumes that 'req.body.genres' is an array of ObjectId strings
			numberInStock: req.body.numberInStock,
			dailyRentalRate: req.body.dailyRentalRate,
		}, { new: true, runValidators: true });

		if (!movie) {
			return res.status(404).send("The movie with the given ID was not found.");
		}
		res.send(movie);
	} catch (error) {
		res.status(500).send(`Error updating the movie: ${error.message}`);
	}
}

export async function updateMovieGenre(req, res) {
	try {
		const movie = await Movie.findByIdAndUpdate(req.params.id, {
			genre: req.body.genres,  // This also assumes that 'req.body.genres' is an array of ObjectId strings
		}, { new: true, runValidators: true });

		if (!movie) {
			return res.status(404).send("The movie with the given ID was not found.");
		}
		res.send(movie);
	} catch (error) {
		res.status(500).send(`Error updating the movie's genre: ${error.message}`);
	}
}

export async function deleteMovie(req, res) {
	try {
		const movie = await Movie.findByIdAndRemove(req.params.id);
		if (!movie) {
			return res.status(404).send("The movie with the given ID was not found.");
		}
		res.send(movie);
	} catch (error) {
		res.status(500).send(`Error deleting the movie: ${error.message}`);
	}
}
