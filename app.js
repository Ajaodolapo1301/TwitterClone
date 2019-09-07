const express = require("express")
const expressLayout = require("express-ejs-layouts")
const bodyParser = require("body-parser")
const flash = require("express-flash")
const session  = require("express-session")
const passport = require("passport")
const cookieParser    = require("cookie-parser")
const passportConfig = require("./config/passport")
const passportSocketIo =require("passport.socketio") 
const MongoStore = require("connect-mongo")(session)
// using app
const app = express()
app.use(express.static(__dirname ))
app.use(bodyParser.urlencoded({extended:true}))
const http = require("http").Server(app)
const io =require("socket.io")(http)
const sessionStore = new MongoStore({
    url: "mongodb://localhost/twitter", autoReconnect: true
})
//session

app.use(session({
secret:"secret",
resave:true,
saveUninitialized:true,
store: new MongoStore({
    url: "mongodb://localhost/twitter", autoReconnect: true
})
}))

// passport middleware
app.use(flash())
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())

// connect flash


// global variable 
app.use((req,res ,next)=>{
    
res.locals.success =req.flash("success")
res.locals.error =req.flash("error")
res.locals.user = req.user
next()
})

// requiring io
require("./Realtime/io")(io)

// io using pasport
io.use(passportSocketIo.authorize({
    cookieParser: cookieParser,
    key:    "connect.sid",
    secret:   "secret",
    store: sessionStore,
    success: onAuthorizeSuccess,
    fail:  onAuthorizeFail
     
}))

function onAuthorizeSuccess(data, accept) {
    console.log("successful connection")
    accept()
}

function onAuthorizeFail (data, message,error, accept) {
    console.log("failed connection")
    if (error) {
        accept(new Error(message))
    }
    
}

// Ejs
app.use(expressLayout)
app.set("view engine", "ejs")

// requiring routes
const mainRoute= require("./routes/main")
const AuthRoute = require("./routes/auth")

// using routes
app.use(mainRoute)
app.use(AuthRoute)




http.listen(8080, function() {
    console.log("server up")
})