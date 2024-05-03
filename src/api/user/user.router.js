import express from "express";
import {signUp} from "./user.controller.js";

const router = express.Router();

router.post("/", signUp);

export { router as userRouter };
