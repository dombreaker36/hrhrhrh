import express from "express";
import controllers from "../controllers/user.js";
import validate from "../validation/validation.js";

const router = express.Router();

router.post("/signup", validate.registration, controllers.registerUser);
router.post("/signin", controllers.signIn)
router.get("/signout",controllers.signOut)

export default router;
