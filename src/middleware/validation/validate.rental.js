import {validateRental} from "../../api/rental/rental.model.js";

export function validateRentalMiddleware(req, res, next) {
    const { error } = validateRental(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
}
