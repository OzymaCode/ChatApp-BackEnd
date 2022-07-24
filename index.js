const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const Schema = mongoose.Schema
const port = process.env.PORT || 1234
const bodyParser = require('body-parser')

const URI =
  'mongodb+srv://oz:oz@cluster0.p6kxcuu.mongodb.net/?retryWrites=true&w=majority'
mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(port))
  .catch((error) => console.log(error))

const userSchema = new Schema({
  name: { type: String, required: true },
  // email: { type: String, required: true },
  // password: { type: String, required: true },
})

const User = mongoose.model('User', userSchema)
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(cors())

app.get('/api', (req, res) => {
  User.find()
    .then((result) => {
      res.json(result)
    })
    .catch((e) => {
      console.log(e)
    })
  // res.json('hello world from express!')
})

app.post('/api', jsonParser, (req, res) => {
  const user = new User({
    name: req.body.name,
  })
  user
    .save()
    .then((result) => {
      res.json(result)
    })
    .catch((error) => {
      console.log(error)
    })
})
