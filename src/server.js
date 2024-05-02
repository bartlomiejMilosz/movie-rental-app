import express from "express";
import mongoose from "mongoose";
import {customerRouter} from "./api/customer/customer.router.js";
import {genreRouter} from "./api/genre/genre.router.js";
import {movieRouter} from "./api/movie/movie.router.js";

const app = express();

mongoose
	.connect("mongodb://localhost:27017/vidly")
	.then(() => console.log("Connected to MongoDB..."))
	.catch((err) => console.error("Could not connect to MongoDB...", err.message));

app.use(express.json());
app.use("/api/genres", genreRouter);
app.use("/api/customers", customerRouter);
app.use("/api/movies", movieRouter);

export { app };
