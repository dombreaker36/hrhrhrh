import { v4 as uuidv4 } from "uuid";
import Question from "../model/question.js";
import Answer from "../model/answer.js";
import mongoose from "mongoose";

class controller {
  // Get all questions
  static getQuestions = async (req, res) => {
    try {
      const questions = await Question.find();
      return res.status(200).json(questions);
    } catch (err) {
      return res.status(400);
    }
  };

  // Get specific question
  static async getQuestion(req, res) {
    try {
      const { id } = req.params;
      const foundQues = await Question.findById(id);

      return res.status(200).json(foundQues);
    } catch (err) {
      return res.status(400).json({ message: "Question not found" });
    }
  }

  static async createQuestion(req, res) {
    try {
      const { title, description } = req.body;

      const newQues = await Question.create({
        title,
        description,
      });

      return res.status(201).json(newQues);
    } catch (err) {
      return res.status(400).json({ msg: err });
    }
  }

  static async updateQuestion(req, res) {
    try {
      const { id } = req.params;
      const { title, description } = req.body;

      const updateQues = await Question.updateOne(
        { _id: id },
        { $set: { title: title } },
        { $set: { description: description } }
      );
      return res.status(201).json(updateQues);
    } catch (err) {
      return res.status(400).json({ msg: "Un known question" });
    }
  }

  static async deleteQuestion(req, res) {
    try {
      const { id } = req.params;

      const myQues = await Question.deleteOne({ _id: id });

      if (!myQues) res.status(400).json({ message: "Question not Found" });

      return res.status(204).json({ message: "Question deleted" });
    } catch (err) {
      return res.status(400).json({ msg: err });
    }
  }

  static async createAnswer(req, res) {
    const { title, description } = req.body;
    const questionId = req.params.id;

    const verifyId = mongoose.Types.ObjectId.isValid(questionId);

    const question = await Question.findOne({ id: questionId });

    if (!verifyId) {
      return res.status(400).json({ err: "incorrect id/question not found" });
    }
    try {
      const createAns = await Answer.create({
        questionId: questionId,
        title,
        description,
      });

      return res.status(201).json({
        message: "Successfully Created",
        answer: createAns,
      });
    } catch (err) {
      return res.status(400).json({
        error: "Cannot find the Question to add an answer",
        msg: err,
      });
    }
  }

  static async getAnswer(req, res) {
    try {
      const questionId = req.params.id;
      const verifyId = mongoose.Types.ObjectId.isValid(questionId);
      if (!verifyId) {
        return res.status(400).json({ err: "incorrect id/question not found" });
      }
      const myAns = await Answer.find({ questionId: questionId });

      return res.status(200).json(myAns);
    } catch (err) {
      return res.status(400).json({
        msg: err,
      });
    }
  }

  static async updateAnswer(req, res) {
    try {
      const { id, ansid } = req.params;
      const { title, description } = req.body;

      const question = await Question.findOne({ _id: id });
      if (!question) {
        res.status(400).json({ message: "Question not Found" });
      }

      const answer = await Answer.findOne({ _id: ansid });

      if (!answer) {
        return res.status(400).json({ message: "Answer not found" });
      }

      const newAnswer = await Answer.updateOne(
        { _id: ansid },
        {
          $set: {
            title: title,
            description: description,
          },
        },
        { new: true }
      );
      return res.status(201).json({
        message: "Answer updated"
      });
    } catch (err) {
      return res.status(400).json(err);
    }
  }
}

export default controller;
