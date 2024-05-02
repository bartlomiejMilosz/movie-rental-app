import express from 'express';
import {deleteMovie, findAll, findById, save, updateMovie, updateMovieGenre} from './movie.controller.js'; // Update the import path according to your project structure

const router = express.Router();

// Get all movies
router.get("/", findAll);

// Get a single movie by ID
router.get("/:id", findById);

// Create a new movie
router.post("/", save);

// Update a movie entirely
router.put("/:id", updateMovie);

// Update only the genres of a movie
router.patch("/:id/genres", updateMovieGenre);

// Delete a movie
router.delete("/:id", deleteMovie);

export { router as movieRouter };
