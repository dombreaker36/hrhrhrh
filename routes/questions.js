import express from "express"
import controllers from "../controllers/controller.js"
import { celebrate, Joi, Segments } from 'celebrate';


const router = express.Router()

router.get('/', controllers.getQuestions)
router.get('/:id', controllers.getQuestion)
router.post('/',celebrate({
  [Segments.BODY]:Joi.object().keys({
    question: Joi.string().required()
  })
}),  controllers.createQuestion)

router.patch('/:id',celebrate({
  [Segments.BODY]:Joi.object().keys({
    question: Joi.string().required()
  })
}),  controllers.updateQuestion)
router.delete('/:id', controllers.deleteQuestion)
// Answers
router.get('/answers', controllers.getAnswers)
router.get('/:id/answers', controllers.getAnswer)
router.post('/answers', controllers.createAnswer)

export default router