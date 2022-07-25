import express from "express";
import controllers from "../controllers/questions.js";
import { celebrate, Joi, Segments } from "celebrate";

const router = express.Router();

router.get("/", controllers.getQuestions);
router.get("/:id", controllers.getQuestion);
router.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      question: Joi.string().min(3).required(),
    }),
  }),
  controllers.createQuestion
);

router.patch(
  "/:id",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      question: Joi.string().min(3).required(),
    }),
  }),
  controllers.updateQuestion
);
router.delete("/:id", controllers.deleteQuestion);
// Answers

router.post(
  "/:id/answers",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      answer: Joi.string().min(3).required(),
    }),
  }),
  controllers.createAnswer
);

router.get("/:id/answers/", controllers.getAnswer);

export default router;
