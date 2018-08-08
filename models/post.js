const mongoose = require('mongoose')
//post model
var Post = mongoose.model('Post',{
    title:{
        type:String
    },
    post:{
        type:String
    }
})

module.exports = {
    Post
}