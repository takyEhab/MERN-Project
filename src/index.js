const express = require('express');
const app = express()
require('dotenv').config()

//import routes
const todoRoute = require('./routes/todo')

// middleware
const morgan = require('morgan')
app.use(morgan('dev'))
app.use(express.json())


// mongo db
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URI_CLOUD, { useNewUrlParser: true } )

const db = mongoose.connection
db.on('error', err => console.log(err))
db.once('open', () => console.log('connected to mongoDB'))

//routes
app.use('/todos', todoRoute)


const PORT = process.env.PORT
app.listen(PORT, () => console.log(`The app listening on port ${PORT}!`))