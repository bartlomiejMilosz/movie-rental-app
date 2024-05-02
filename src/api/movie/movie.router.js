import express from 'express';
import {deleteMovie, findAll, findById, save, updateMovie, updateMovieGenre} from './movie.controller.js'; // Update the import path according to your project structure

const router = express.Router();

router.get("/", findAll);
router.get("/:id", findById);
router.post("/", save);
router.put("/:id", updateMovie);
router.patch("/:id/genres", updateMovieGenre);
router.delete("/:id", deleteMovie);

export { router as movieRouter };
