import movieService from "./movie.service.js";

export async function findAllMovies(req, res, next) {
	try {
		const page = Number.parseInt(req.query.page) || 1;
		const limit = Number.parseInt(req.query.limit) || 10;
		const movies = await movieService.findAllMovies(page, limit);
		res.send(movies);
	} catch (error) {
		next(error);
	}
}

export async function findMovieById(req, res, next) {
	try {
		const movie = await movieService.findMovieById(req.params.id);
		res.send(movie);
	} catch (error) {
		next(error);
	}
}

export async function saveMovie(req, res, next) {
	const movie = req.body;
	try {
		const savedMovie = await movieService.saveMovie(movie);
		res.status(201).send(savedMovie);
	} catch (error) {
		next(error);
	}
}

export async function updateMovie(req, res, next) {
	const movieId = req.params.id;
	const movie = req.body;

	try {
		const updatedMovie = await movieService.updateMovie(movieId, movie);
		res.status(200).send(updatedMovie);
	} catch (error) {
		next(error);
	}
}

export async function updateMovieGenre(req, res, next) {
	const movieId = req.params.id;
	const movieGenre = req.body;
	try {
		const updatedMovieGenre = await movieService.updateMovieGenre(
			movieId,
			movieGenre,
		);
		res.status(200).send(updatedMovieGenre);
	} catch (error) {
		next(error);
	}
}

export async function deleteMovie(req, res, next) {
	const movieId = req.params.id;

	try {
		const movie = await movieService.deleteMovie(movieId);
		res.status(200).send(movie);
	} catch (error) {
		next(error);
	}
}
