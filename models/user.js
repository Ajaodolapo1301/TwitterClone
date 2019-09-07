var mongoose = require("mongoose")
var bcrypt = require("bcryptjs")
var crypto = require("crypto")




const UserSchema = new mongoose.Schema({
    email:{
        type: "string",
        required: true,
        unique:true,
        lowercase: true
    },
    password: "string",
    name: "string",
    photo: "string",
    
    tweets:[{ 
        tweet: {type: mongoose.Schema.Types.ObjectId, ref: "Tweet"}
}],
    following:[{
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    }],
    followers:[{
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    }]

})

// UserSchema.pre("save", function(next) {
//     var user = this
   
//     if(!user.isModified("password")) return next
   
//     if(user.password){
       
//         bcrypt.genSalt(10, function(err,salt) {
//             if (err) return next(err)
//             bcrypt.hash(user.password, salt ,null, function(err, hash) {
//                 if (err) return next()
//                 user.password= hash
//                 next(err)
//             })
//         })
//     }
// })


UserSchema.methods.gravatar = function(size) {
    if(!size) size =200
    if(!this.email) return "https://gravatar.com/avatar/?s=" + size + "&d=retro"
    var md5 =crypto.createHash( "md5").update(this.email).digest("hex")
    return "https://gravatar.com/avatar/" + md5 + "?s=" +size + "&d=retro"
}


UserSchema.methods.comparePassword = function(candidatePassword,next) {
    bcrypt.compare(candidatePassword,this.password,function (err,isMatch) {
        if (err) return next(err)
        next (null,isMatch)
       });
    }



var User = mongoose.model("User", UserSchema)

module.exports = User