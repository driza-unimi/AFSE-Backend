const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    credit: {
        type: Number,
        default: 0,
    },
    cards: [{
        card: {
            type: String,
            ref: 'Hero'
        },
        count: {
            type: Number,
            default: 1
        }
    }]
});

module.exports = mongoose.model('User', userSchema);
