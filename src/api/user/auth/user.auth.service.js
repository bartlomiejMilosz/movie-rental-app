import bcrypt from 'bcrypt';
import {User} from "../user.model.js";

class UserAuthService {
	async signInUser(email, password) {
		const user = await User.findOne({ email: email });
		if (!user) {
			throw new Error("Invalid email or password.");
		}

		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) {
			throw new Error("Invalid email or password.");
		}

		return user.generateAuthToken();
	}
}

export default new UserAuthService();
