import {validateMovie} from "../../api/movie/movie.model.js";

export function validateMovieMiddleware(req, res, next) {
    const { error } = validateMovie(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
}