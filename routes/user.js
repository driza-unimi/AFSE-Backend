const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Offer = require('../models/offer');
const Hero = require('../models/hero');
const asyncMiddleware = require('../middlewares/asyncMiddleware');
const bcrypt = require("bcryptjs");

router.get('/', asyncMiddleware(async (req, res, next) => {
  const username = req.user.username;
  const user = await User.findOne({username})
    .populate('cards.card')
    .exec();

  const {_id, password, cards, ...data} = user.toObject();

  data.cards = cards
    .filter(card => card.card !== null)
    .map(card => ({
      ...card.card,
      count: card.count
    }));

  res.success('', data);
}))

router.put('/', asyncMiddleware(async (req, res, next) => {
  const {username, role} = req.user;

  if (role === 'admin') return res.badRequest('Cannot edit admin user');

  const user = await User.findOne({username});
  const {email, newPassword} = req.body;

  if (email) {
    user.email = email;
  }
  if (newPassword) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword
  }

  if (newPassword || email) await user.save();

  const {_id, password, ...data} = user.toObject();

  res.success('', data);
}))

router.delete('/', asyncMiddleware(async (req, res, next) => {
  const {username, role} = req.user;

  if (role === 'admin') return res.badRequest('Cannot delete admin user');

  await User.deleteOne({username})
  res.clearCookie('token');

  res.success();
}))


router.get('/offers', asyncMiddleware(async (req, res, next) => {
  const offers = await Offer.find({valid: true});

  res.success('', offers);
}));

router.post('/buy', asyncMiddleware(async (req, res, next) => {
  const {username} = req.user;
  const user = await User.findOne({username});

  const {id} = req.body;
  const offer = await Offer.findById({_id: id});

  if (!offer) return res.badRequest('Offer not found');
  if (!offer.valid) return res.badRequest('Offer not valid');

  if (offer.type === 'credit') {
    user.credit += offer.value;
    await user.save();
  } else if (offer.type === 'pack') {
    if (user.credit < offer.cost && user.role !== 'admin') return res.badRequest('Not enough credit');

    let matchCondition = {};
    if (offer.name === 'Elite Card Pack') {
      matchCondition.rarity = {$ne: 'common'};
    } else if (offer.name === 'Legendary Pack') {
      matchCondition.rarity = 'legendary';
    }

    const randomCards = await Hero.aggregate([
      {$match: matchCondition},
      {$sample: {size: offer.value}},
    ]);

    for (let card of randomCards) {
      try {
        const currentCount = user.cards.find(c => c.card === card._id)?.count
        const count = currentCount ? currentCount + 1 : 1;

        user.cards.push({
          card: card._id,
          count
        });
      } catch (e) {
        console.log(card)
        console.error(e)
      }
    }

    user.credit -= offer.cost;
    await user.save();

    return res.success('', randomCards);
  }

  res.success();
}));


module.exports = router;