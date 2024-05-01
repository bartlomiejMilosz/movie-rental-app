import {
	findAll,
	findById,
	create,
	update,
	deleteGenre,
} from "./genre.controller.js";
import { Router } from "express";

const router = Router();

router.get("/", findAll);
router.get("/:id", findById);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", deleteGenre);

export { router as genreRouter };
