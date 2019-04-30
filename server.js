var express = require('express')
const helmet = require('helmet')
var bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')
var listing = require('./services/ListingService.js')
var listings = require('./routes/listings')
var users = require('./routes/users')
const auth = require('./lib/auth')
const passport = require('passport')


app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser())
app.use(helmet())

//routes
app.use("/api", listings)
app.use("/api",users)



app.use (session({
  secret: 'very secret 1234',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}))

//load auth after session is initialized

app.use(auth.initialize)
app.use(auth.session)
app.use(auth.setUser)



io.on('connection',(socket) => {
  console.log("user connected")
})


var server = http.listen(3000, () => {

  console.log("server is listening to port",server.address().port)

})

module.exports = app
