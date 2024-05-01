import {
	findAll,
	findById,
	create,
	update,
	deleteCustomer,
} from "./customer.controller.js";
import { Router } from "express";

const router = Router();

router.get("/", findAll);
router.get("/:id", findById);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", deleteCustomer);

export { router as customerRouter };
