import  app from './app'

const PORT = process.env.PORT || 5000

app.use('/questions', questionRoutes)

app.listen(PORT, console.log(`server running on Port ${PORT}`))


