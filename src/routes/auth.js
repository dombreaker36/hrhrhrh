import express from "express";
import controllers from "../controllers/user.js";
import { celebrate, Joi, Segments } from "celebrate";

const router = express.Router();

router.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(6).required(),
      email: Joi.string().min(6).max(255).required(),
      password: Joi.string().min(8).max(1024).required(),
    }),
  }),
  controllers.registerUser
);

export default router;
