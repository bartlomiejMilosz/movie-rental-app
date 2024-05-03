import {create, deleteGenre, findAll, findById, update,} from "./genre.controller.js";
import {Router} from "express";
import {userAuth} from "../../middleware/user.auth.js";
import {adminAuth} from "../../middleware/admin.auth.js";

const router = Router();

router.get("/", findAll);
router.get("/:id", findById);
// Added userAuth, now can be accessed by setting request header to x-userAuth-token: "token generated during user creation" (or user sign in via user.userAuth.controller)
router.post("/", userAuth, create);
router.put("/:id", userAuth, update);
router.delete("/:id", [userAuth, adminAuth], deleteGenre);

export { router as genreRouter };
