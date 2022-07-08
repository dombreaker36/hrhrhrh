import express from "express"
import bodyParser from "body-parser"
import questionRoutes from './routes/questions.js'

const app = express()

app.use(bodyParser.json())

const PORT = 5000

app.use('/questions', questionRoutes)

app.get('/', (req, res)=>{
  res.send('Welcome to Our Home Page')
})

app.listen(PORT, console.log(`server running on Port ${PORT}`))

