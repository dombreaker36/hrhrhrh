import express from "express";
import controllers from "../controllers/questions";
import validate from "../validation/validation";

const router = express.Router();

router.get("/", controllers.getQuestions);
router.get("/:id", controllers.getQuestion);
router.post("/", validate.questionValidation, controllers.createQuestion);

router.put(
  "/:id",
  validate.updateQuestion,

  controllers.updateQuestion
);
router.delete("/:id", controllers.deleteQuestion);
// Answers

router.post("/:id/answers", validate.createAnswer, controllers.createAnswer);

router.get("/:id/answers/", controllers.getAnswer);


router.put("/:id/answers/ansid",controllers.updateAnswer);
// <questionId>/answers/<answerId>

export default router;
