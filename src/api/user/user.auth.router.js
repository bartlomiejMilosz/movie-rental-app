import express from "express";
import {signIn} from "./user.auth.controller.js";

const router = express.Router();

router.post("/", signIn);

export { router as userAuthRouter };
