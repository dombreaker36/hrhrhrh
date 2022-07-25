import express from "express"
import {errors}from 'celebrate'
import bodyParser from "body-parser"
import questions from './src/routes/questions.js'


const app = express()

app.use(bodyParser.json());

app.use('/questions', questions);

app.get('/', (req, res)=>{
  res.send('Welcome to Our Home Page')
})

app.use(errors());

export default app;