import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import router from './routes/passRoute.js'

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())
await connectDb()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/passwords', router )


app.listen(3000, () => {
  console.log(`Example app listening on port`)
})