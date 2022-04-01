const express = require('express');
const app = express()
require('dotenv').config()
const cors = require("cors")
const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))

//import routes
const todoRoute = require('./routes/todo')
const userRoute = require('./routes/user')
const transferRoute = require('./routes/transferMoney')

// middleware
const morgan = require('morgan')
app.use(morgan('dev'))
app.use(express.json())


// mongo db
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URI_LOCAL)

const db = mongoose.connection
db.on('error', err => console.log(err))
db.once('open', () => console.log('connected to mongoDB'))


//routes
app.use('/todo', todoRoute)
app.use('/user', userRoute)
app.use('/money', transferRoute)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`The app listening on port ${PORT}!`))