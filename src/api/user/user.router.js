import express from "express";
import {findAll} from "./user.controller.js";

const router = express.Router();

router.get("/", findAll);

export { router as userRouter };
