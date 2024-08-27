const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const heroSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4,
    },
    name: {
      type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    rarity: {
        type: String,
        enum: ['legendary', 'epic', 'rare', 'common'],
        default: 'common'
    },
});

module.exports = mongoose.model('Hero', heroSchema);
