const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const User = require("../models/user")
const bcrypt =require("bcryptjs")

passport.serializeUser(function(user,done) {
    done(null,user.id)
});

passport.deserializeUser(function(id,done) {
    User.findById(id, function (err,user) {
        done(err, user)
    });
});

passport.use("local-login", new LocalStrategy({
usernameField:"email",
passwordField:"password",
passReqToCallback: true
}, function(req,email,password,done) {
    User.findOne({email:email},function(err,user) {
        if(err) return done(err)
       
        if (!user) 
        return done(null,false, req.flash("error", "No user found"))
        
        bcrypt.compare(password,user.password,(err, isMatch)=>{
            if (err) throw err
            if (isMatch){
                return done(null, user)
            }else{
                return done(null, false, { error: "wrong password"})
            }

        })
            

       
    })
}))