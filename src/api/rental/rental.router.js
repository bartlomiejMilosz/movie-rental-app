import express from "express";
import {findAll, findById, save} from "./rental.controller.js";

const router = express.Router();

router.get("/", findAll);
router.get("/:id", findById);
router.post("/", save);

export { router as rentalRouter };
