import {deleteGenre, findAllGenres, findGenreById, saveGenre, updateGenre,} from "./genre.controller.js";
import {Router} from "express";
import {userAuth} from "../../middleware/auth/user.auth.js";
import {adminAuth} from "../../middleware/auth/admin.auth.js";
import {validateGenreMiddleware} from "../../middleware/validation/validate.genre.js";

const router = Router();

router.get("/", findAllGenres);
router.get("/:id", findGenreById);
router.post("/", validateGenreMiddleware, userAuth, saveGenre);
router.put("/:id", validateGenreMiddleware, userAuth, updateGenre);
router.delete("/:id", [userAuth, adminAuth], deleteGenre);

export { router as genreRouter };
