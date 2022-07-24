const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(cors())

app.get('/api', (req, res) => {
  res.json('hello world from express!')
})

app.listen(process.env.PORT || 1234)
