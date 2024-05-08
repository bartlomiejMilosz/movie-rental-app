import express from "express";
import { signInUser } from "./user.auth.controller.js";
import { validateUserAuthMiddleware } from "../../../middleware/validation/validate.user.auth.js";

const router = express.Router();

router.post("/", validateUserAuthMiddleware, signInUser);

export { router as userAuthRouter };
