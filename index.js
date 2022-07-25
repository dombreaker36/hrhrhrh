import app from './app.js'
import { errors } from 'celebrate';

const PORT = process.env.PORT || 5000

app.use(errors());

app.listen(PORT, console.log(`server running on Port ${PORT}`))


