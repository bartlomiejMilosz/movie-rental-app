import express from "express";
import {findById, signUp} from "./user.controller.js";
import {userAuth} from "../../middleware/auth/user.auth.js";

const router = express.Router();

// Set it private via userAuth middleware due to security purposes
router.get("/me", userAuth, findById);
// Keep signup public, every client should get ability to register
router.post("/", signUp);

export { router as userRouter };
