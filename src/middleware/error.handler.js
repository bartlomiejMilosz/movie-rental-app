import {NotFoundError} from "../errors/NotFoundError.js";
import {DatabaseError} from "../errors/DatabaseError.js";

function errorHandler(error, req, res, next) {
    // Log the error for internal auditing/debugging
    console.error(error);

    // Handle known error types
    if (error instanceof NotFoundError) {
        return res.status(error.status).send({ error: error.message });
    }
    if (error instanceof DatabaseError) {
        return res.status(error.status).send({ error: "A database error occurred." });
    }

    // Default
    const status = error.status || 500;
    const message = error.message || "An unexpected error occurred";
    res.status(status).send({ error: message });
}

export default errorHandler;