import genreService from "./genre.service.js";

export async function findAllGenres(req, res, next) {
	try {
		const page = Number.parseInt(req.query.page) || 1;
		const limit = Number.parseInt(req.query.limit) || 10;
		const genres = await genreService.findAllGenres(page, limit);
		res.send(genres);
	} catch (error) {
		next(error);
	}
}

export async function findGenreById(req, res, next) {
	try {
		const genre = await genreService.findGenreById(req.params.id);
		res.send(genre);
	} catch (error) {
		next(error);
	}
}

export async function saveGenre(req, res, next) {
	const genre = req.body;
	try {
		const savedGenre = await genreService.saveGenre(genre);
		res.status(201).send(savedGenre);
	} catch (error) {
		next(error);
	}
}

export async function updateGenre(req, res, next) {
	const genreId = req.params.id;
	const genre = req.body;

	try {
		const updatedGenre = await genreService.updateGenre(genreId, genre);
		res.status(200).send(updatedGenre);
	} catch (error) {
		next(error);
	}
}

export async function deleteGenre(req, res, next) {
	const genreId = req.params.id;

	try {
		const genre = await genreService.deleteGenre(genreId);
		res.status(200).send(genre);
	} catch (error) {
		next(error);
	}
}
