import { Genre, validateGenre } from "./genre.model.js";

// Middleware
export async function findAll(req, res) {
	try {
		const genres = await Genre.find().sort("name");
		res.send(genres);
	} catch (error) {
		res.status(500).send("Error retrieving genres.");
	}
}

export async function findById(req, res) {
	try {
		const genre = await Genre.findById(req.params.id);
		if (!genre) {
			return res.status(404).send("The genre with the given ID was not found.");
		}
		res.send(genre);
	} catch (error) {
		res.status(500).send("Error finding the genre.");
	}
}

export async function create(req, res) {
	const { error } = validateGenre.validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let genre = new Genre({ name: req.body.name });
	try {
		genre = await genre.save();
		res.send(genre);
	} catch (error) {
		res.status(500).send("Error saving the genre.");
	}
}

export async function update(req, res) {
	const { error } = validateGenre.validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	try {
		const genre = await Genre.findByIdAndUpdate(
			req.params.id,
			{ name: req.body.name },
			{ new: true },
		);
		if (!genre) {
			return res.status(404).send("The genre with the given ID was not found.");
		}
		res.send(genre);
	} catch (error) {
		res.status(500).send("Error updating the genre.");
	}
}

export async function deleteGenre(req, res) {
	try {
		const genre = await Genre.findByIdAndDelete(req.params.id);
		if (!genre) {
			return res.status(404).send("The genre with the given ID was not found.");
		}
		res.send(genre);
	} catch (error) {
		res.status(500).send("Error deleting the genre.");
	}
}
