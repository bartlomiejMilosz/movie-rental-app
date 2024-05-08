import {DatabaseError} from "../../errors/DatabaseError.js";
import {NotFoundError} from "../../errors/NotFoundError.js";
import {AlreadyExistsError} from "../../errors/AlreadyExistsError.js";
import bcrypt from "bcrypt";
import {User} from "./user.model.js";

class UserService {
    async findUserById(userId) {
        try {
            const user = await User.findById(userId).select("-password");
            if (!user) {
                throw new NotFoundError(`User with ID ${userId} not found`);
            }
            return user;
        } catch (error) {
            console.error(
                `Error retrieving user with ID: ${userId}, ${error.message}`,
                error,
            );
            throw new DatabaseError("Database error occurred while retrieving user");
        }
    }

     async signUpUser(userData) {
        const userToCheck = await User.findOne({ email: userData.email });
        if (userToCheck) {
            throw new AlreadyExistsError("User already registered");
        }

        let newUser = new User({
            name: userData.name,
            email: userData.email,
            password: userData.password,
        });

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(userData.password, salt);

        try {
            newUser = await newUser.save();
            return newUser;
        } catch (error) {
            console.error(`Error saving user: ${userData.email}, ${error.message}`, error);
            throw new DatabaseError("Database error occurred while saving user");
        }
    }
}

export default new UserService();