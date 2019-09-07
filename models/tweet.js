var mongoose = require("mongoose")

const TweetSchema = new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: "string",
    created: {
        type: Date,
        default: Date.now
    } 
})
    

var Tweet = mongoose.model("Tweet", TweetSchema)
module.exports = Tweet