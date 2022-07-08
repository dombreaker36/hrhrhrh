import express from "express"
import controllers from "../controllers/controller.js"

const router = express.Router()

router.get('/', controllers.getQuestions)
router.get('/:id', controllers.getQuestion)
router.post('/', controllers.createQuestion)
router.patch('/:id', controllers.updateQuestion)
router.delete('/:id', controllers.deleteQuestion)

export default router