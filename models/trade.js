const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const tradeSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  seller: {
    type: String,
    ref: 'User',
    required: true,
  },
  card: {
    type: String,
    ref: 'Hero',
    required: true,
  },
  offers: [{
    buyer: {
      type: String,
      ref: 'User',
      required: true,
    },
    cards: [
      {
        type: String,
        ref: 'Hero',
      },
    ]
  }],
});

module.exports = mongoose.model('Trade', tradeSchema);
