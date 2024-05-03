import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
import {complexityOptions} from "./user.model.js";

const userAuthSchemaJoi = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: passwordComplexity(complexityOptions, "Password").required(),
});

export function validateUserAuth(req) {
    return userAuthSchemaJoi.validate(req);
}