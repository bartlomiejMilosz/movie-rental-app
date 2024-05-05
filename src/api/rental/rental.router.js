import express from "express";
import {findAllRentals, findRentalById, saveRental} from "./rental.controller.js";

const router = express.Router();

router.get("/", findAllRentals);
router.get("/:id", findRentalById);
router.post("/", saveRental);

export { router as rentalRouter };
