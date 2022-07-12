const mongoose = require('mongoose')

const AuthSchema = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    data:[]

})

const Auth = new mongoose.model('Auth', AuthSchema)

module.exports = Auth