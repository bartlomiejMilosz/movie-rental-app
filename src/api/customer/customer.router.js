import {
    deleteCustomer,
    findAllCustomers,
    findCustomerById,
    saveCustomer,
    updateCustomer,
} from "./customer.controller.js";
import {Router} from "express";

const router = Router();

router.get("/", findAllCustomers);
router.get("/:id", findCustomerById);
router.post("/", saveCustomer);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

export { router as customerRouter };
