const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    Age: {
        type: Number,
        require: true
    },
    Adress: {
        type: String,
        require: true
    },
    resetOtp: {
        type: String
    },
    passExpire:{
        type:Date
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: false
    }
})
exports.User = mongoose.model('user', userSchema);