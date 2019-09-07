var mongoose = require("mongoose")
mongoose.set("debug",true)
 mongoose.connect("mongodb://localhost/twitter")


mongoose.Promise = Promise 
module.exports.User= require("./user")
module.exports.Tweet= require("./tweet")


















