import express from "express";
import mongoose from "mongoose";
import config from "config";
import {customerRouter} from "./api/customer/customer.router.js";
import {genreRouter} from "./api/genre/genre.router.js";
import {movieRouter} from "./api/movie/movie.router.js";
import {rentalRouter} from "./api/rental/rental.router.js";
import {userRouter} from "./api/user/user.router.js";
import {userAuthRouter} from "./api/user/user.auth.router.js";

if (!config.get("jwtPrivateKey")) {
	console.error("FATAL ERROR: jwtPrivateKey is not defined!");
	process.exit(1);
}

const app = express();

const dbConfig = config.get("db");
const dbURI = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.dbName}`;

mongoose
	.connect(dbURI)
	//.connect("mongodb://localhost:27017/movie-rental")
	.then(() => console.log("Connected to MongoDB..."))
	.catch((err) => console.error("Could not connect to MongoDB...", err.message));

app.use(express.json());
app.use("/api/genres", genreRouter);
app.use("/api/customers", customerRouter);
app.use("/api/movies", movieRouter);
app.use("/api/rentals", rentalRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", userAuthRouter);

export { app };
