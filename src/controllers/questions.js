import { v4 as uuidv4 } from "uuid";

let questions = [];
let answers = [];

class controller {
  // The method below gets all questions are current in our array of questions
  static getQuestions = (req, res) => {
    res.json(questions);
  };

  // This method gets a question from our array by id
  static getQuestion = (req, res) => {
    const { id } = req.params;
    const foundQues = questions.find((question) => question.id === id);

    if (!foundQues) {
      res
        .status(200)
        .json({ error: `Question with id:${id} is not found in the database` });
    }
    res.json(foundQues);
  };

  static createQuestion = (req, res) => {
    const question = req.body;

    const createQues = { ...question, id: uuidv4() };

    questions.push(createQues);

    res
      .status(201)
      .json({ msg: `Your Question has been  added to the database` });
  };

  static updateQuestion = (req, res) => {
    const { id } = req.params;

    const ques = req.body.question;

    const findQues = questions.find((question) => question.id === id);

    if (!findQues) {
      res
        .status(400)
        .json({
          error: `Question with id ${id} cannot be editted because it doesn't exist in the DB`,
        });
    }
    if (findQues) {
      findQues.question = ques;
    }
  };

  static deleteQuestion = (req, res) => {
    const { id } = req.params;

    const myQues = questions.findIndex((question) => question.id === id);

    if (!myQues) res.status(400).json({ message: "Question not Found" });
    if (myQues) {
      questions.splice(myQues, 1);
      res.status(202).json({ message: "Question deleted" });
    }
  };

  static createAnswer = (req, res) => {
    const answer = req.body.answer;

    const questionId = req.params.id;

    const createAns = {
      id: uuidv4(),
      quesId: questionId,
      answer: req.body.answer,
    };

    answers.push(createAns);

    res.status(201).json(answers);
  };

  static getAnswer = (req, res) => {
    const { id } = req.params.id;
    const myAns = answers.filter((answer) => answer.id === id);

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
