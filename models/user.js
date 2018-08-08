const mongoose = require('mongoose')

const User = mongoose.model('User',{
    name:{
        type:String
    },
    password:{
        type:String,
        require:true,
        minlength:6,
        admin:Boolean
    }
})

module.exports = {
    User
}