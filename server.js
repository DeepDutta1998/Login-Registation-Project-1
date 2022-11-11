const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const path = require('path')
const cookieParser = require('cookie-parser')

app.use(express.static(path.join(__dirname, 'public')))
app.use(
  express.urlencoded({
    extended: true,
  })
)

app.use(cookieParser())

app.set('view engine', 'ejs')
app.set('views', 'views')

const jwtAuth=require('./middleware/authJwt')
app.use(jwtAuth.authJwt)

const logRegRoutes = require('./routes/logReg.routes')
app.use(logRegRoutes)

const port = process.env.PORT || 2020

const dbDriver =
  'mongodb+srv://lofi:t3MbHpVAab6Oy0nn@cluster0.rmvujxb.mongodb.net/LogReg'

mongoose
  .connect(dbDriver, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    app.listen(port, () => {
      console.log('DB connected')
      console.log(`Server is running @ http://localhost:${port}`)
    })
  })
  .catch((err) => {
    console.log('DB is not connected')
    console.log(err)
  })
