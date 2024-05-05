import express from "express";
import {findAllRentals, findRentalById, saveRental} from "./rental.controller.js";
import {validateRentalMiddleware} from "../../middleware/validation/validate.rental.js";

const router = express.Router();

router.get("/", findAllRentals);
router.get("/:id", findRentalById);
router.post("/", validateRentalMiddleware, saveRental);

export { router as rentalRouter };
