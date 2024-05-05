import express from "express";
import {
    deleteMovie,
    findAllMovies,
    findMovieById,
    saveMovie,
    updateMovie,
    updateMovieGenre,
} from "./movie.controller.js";
import {validateMovieMiddleware} from "../../middleware/validation/validate.movie.js";

const router = express.Router();

router.get("/", findAllMovies);
router.get("/:id", findMovieById);
router.post("/", validateMovieMiddleware, saveMovie);
router.put("/:id", validateMovieMiddleware, updateMovie);
router.patch("/:id/genres", validateMovieMiddleware, updateMovieGenre);
router.delete("/:id", deleteMovie);

export { router as movieRouter };
