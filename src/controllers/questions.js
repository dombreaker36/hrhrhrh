import { v4 as uuidv4 } from "uuid";
import Question from "../model/question.js";
import Answer from "../model/answer.js";

class controller {
  // Get all questions
  static getQuestions = async (req, res) => {
    try {
      const questions = await Question.find();
      return res.status(200).json(questions);
    } catch (err) {
      return res.status(400)
    }
  };

  // Get specific question
  static async getQuestion(req, res) {
    try {
      const { id }  = req.params;
      const foundQues = await Question.findById(id)

      if (!foundQues) {
        res
          .status(400)
          .json({
            error: `Question with id:${id} is not found in the database`,
          });
      }
      res.json(foundQues);
    } catch (err) {
      return res.status(400)
    }
  }

  static async createQuestion(req, res) {
    try {
      const { title, description } = req.body;
 
      const newQues = new Question({
        id: uuidv4(),
        title,
        description,
      });
      const savedQuestion = await newQues.save();
      return res.status(201).json(savedQuestion);
    } catch (err) {
      return res.status(400);
    }
  }

  static async updateQuestion(req, res) {
    try {
      const { id } = req.params;
      const { title, description } = req.body;

      const updateQues = updateOne( 
        {_id: id}, 
        {$set:{title: title}},
        {$set:{description: description}} 
        );
      return res.status(201).json(updateQues);

    } catch (err) {
      return res.status(400)
    }
  }

    static async deleteQuestion (req, res){
      try {
        const { id } = req.params;
    
        const myQues = await Question.deleteOne({_id: id});
    
        if (!myQues) res.status(400).json({ message: "Question not Found" });
        if (myQues) {
          res.status(204).json({ message: "Question deleted" });
        }
      }
      catch(err){
        res.status(400).res.send({msg: err})
      }
  };

  static async createAnswer (req, res) {
    try {
      const {title, description} = req.body

      const questionId = req.params.id

      const createAns = new Answer ({
        id:uuidv4(),
        questionId: questionId,
        title: title,
        description: description,
      });

      const savedAns = await createAns.save();

      return res.status(201).json(savedAns)
    }catch(err){
      return res.status(400).json(err)
    }

  };

  static async getAnswer (req, res){
    const { id } = req.params;

    const myAns = await Answer.findById(id);

    if (!myAns) {
      res
        .status(400)
        .json({ message: "Answer to this question does not exist" });
    }
    if (myAns) {
      res.status(200).json(myAns);
    }
  };
}

export default controller;
