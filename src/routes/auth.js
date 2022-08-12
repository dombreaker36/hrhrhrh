import express from "express";
import controllers from "../controllers/user.js";
import validate from "../validation/validation.js";

const router = express.Router();

router.post("/", validate.registration, controllers.registerUser);

export default router;
