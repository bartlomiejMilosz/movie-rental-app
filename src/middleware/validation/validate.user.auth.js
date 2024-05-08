import {validateUserAuth} from "../../api/user/auth/user.auth.validation.js";

export function validateUserAuthMiddleware(req, res, next) {
    const { error } = validateUserAuth(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
}
