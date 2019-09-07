const router = require("express").Router()
const db = require("../models")
const User = require("../models/user")
const bcrypt = require("bcryptjs")
const passport = require("passport")
const passportConfig = require("../config/passport")





router.route("/login")
.get(function(req,res, next) {
    res.render("login")  
})
.post(passport.authenticate("local-login",{
    successRedirect: "/",
    failureRedirect: '/login',
    failureFlash: true
}))


router.route("/signup")
.get(function(req, res ) {
    res.render("signup")
})
.post(function(req, res) {
    var {name, email, password} = req.body
    let errors =[]
    
    //CHECKING ALL FIELDS
    if (!name || !email || !password) {
        errors.push({msg:"please enter all fields"})
    }
    
    if (errors.length > 0) {
        res.render("signup", {
            errors,
            name,
            email,
            password
        })
    }
    
    
    else{
        db.User.findOne({email:email})
        .then(user=>{
            if (user) {
                // user exist
                errors.push({msg: "user already exist"})
                res.render("signup", {
                    errors,
                    name,
                    email,
                })
            }else{
                var user = new User()
                    user.name = req.body.name
                    user.email = req.body.email
                    user.password = req.body.password
                    user.photo = user.gravatar()

                    bcrypt.genSalt(10, (err, salt)=>{
                        bcrypt.hash(user.password, salt, (err,hash)=>{
                            if (err) throw err
                            // set password to hash
                            user.password = hash
                    //         // save user
                            user.save()
                    .then(user=>{
                        req.flash("success", "you are registered and can now log in")
                        res.redirect("/login")
                    })
                        })

                    })
                    
                
            }
        })

    }

})


// logout

router.get("/logout", function(res,req,next) {
    req.logOut();
      res.redirect('/')

    })




module.exports = router