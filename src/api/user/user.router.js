import express from "express";
import {findById, signUpUser} from "./user.controller.js";
import {userAuth} from "../../middleware/auth/user.auth.js";
import {validateUserMiddleware} from "../../middleware/validation/validate.user.js";

const router = express.Router();

router.get("/me", userAuth, findById);
router.post("/", validateUserMiddleware, signUpUser); // Keep signup "public", every client should get ability to register

export { router as userRouter };
