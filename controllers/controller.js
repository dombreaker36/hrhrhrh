import { v4 as uuidv4} from 'uuid'

let questions = []

class controller {
  // The method below gets all questions are current in our array of questions
  static getQuestions = (req, res)=>{
    res.json(questions)
  }


  // This method gets a question from our array by id
  static getQuestion = (req, res)=>{
  const { id } = req.params
  const foundQues = questions.find((question)=>question.id === id)

  if(!foundQues) {
    res.status(200).json({error:`Question with id:${id} is not found in the database`})
  }
  res.json(foundQues)
  } 

  static createQuestion = (req, res)=>{
    const question  = req.body

    const createQues = {...question, id: uuidv4()}

    questions.push(createQues)

    res.status(201).json({msg:`Your Question has been  added to the database`})
  }

  static updateQuestion = (req, res)=>{
    const { id }  = req.params

    const ques = req.body.question

    const findQues = questions.find((question)=>question.id === id)

    if(!findQues){
      res.status(400).json({error:`Question with id ${id} cannot be editted because it doesn't exist in the DB`})
    }
    if(ques) findQues.question = ques
  }

  static deleteQuestion = (req, res)=>{
    const { id }  = req.params

    questions = questions.filter((question)=>question.id === id)

    res.status(204).json({msg:`Question with id ${id} has been deleted from the DB`})
  }
}

export default controller