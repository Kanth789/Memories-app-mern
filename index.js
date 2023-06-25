import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import router from './routes/posts.js' 
import userRouters from './routes/userRouters.js'
import dotenv from 'dotenv'

const app = express();
dotenv.config()
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors())

app.use('/posts',router)
app.use('/user',userRouters)

mongoose.connect(process.env.CONNECT_URL)
.then(()=> app.listen(process.env.PORT,()=>console.log('DB connected')))
.catch(err=>console.log(err))


