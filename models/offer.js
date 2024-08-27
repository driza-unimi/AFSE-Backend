const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const offerSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4,
    },
    name: {
      type: String,
    },
    cost: {
        type: Number,
    },
    type: {
        type: String,
        enum: ['credit', 'pack'],
        default: 'credit',
    },
    valid: {
        type: Boolean,
        default: false,
    },
    value: {
        type: Number,
    },
    description: {
        type: String,
    }
});

module.exports = mongoose.model('Offer', offerSchema);
