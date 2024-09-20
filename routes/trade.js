const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Trade = require('../models/trade');
const Hero = require('../models/hero');
const asyncMiddleware = require('../middlewares/asyncMiddleware');

router.get('/', asyncMiddleware(async (req, res) => {
  const offers = await Trade.aggregate([{ $sample: { size: 20 } }]);

  await Trade.populate(offers, [
    { path: 'seller', select: 'username' },
    { path: 'card'}
  ]);

  res.success('', offers);
}));

router.put('/', asyncMiddleware(async (req, res) => {
  const username = req.user.username;
  const { cardId } = req.body;

  const user = await User.findOne({ username });
  const cardEntry = user.cards.find(c => c.card === cardId && c.count > 1);

  if (!cardEntry) return res.badRequest('Card not available for offer or insufficient duplicates');

  const newTrade = new Trade({
    seller: user._id,
    card: cardId,
  });

  cardEntry.count -= 1;
  await newTrade.save();
  await user.save();

  res.success();
}));

router.post('/sellAll', asyncMiddleware(async (req, res) => {
  const username = req.user.username;
  const user = await User.findOne({ username });
  if (!user) return res.badRequest('User not found');

  const rarityCredits = { common: 1, rare: 3, epic: 20, legendary: 50 };
  let totalCreditGain = 0;

  for (let cardEntry of user.cards) {
    if (cardEntry.count > 1) {
      const hero = await Hero.findById(cardEntry.card);
      if (hero) {
        const creditGain = rarityCredits[hero.rarity];
        totalCreditGain += (cardEntry.count - 1) * creditGain;
        cardEntry.count = 1;
      }
    }
  }

  user.credit += totalCreditGain;
  await user.save();

  res.success('', totalCreditGain);
}));

router.delete('/:id', asyncMiddleware(async (req, res) => {
  const username = req.user.username;
  const user = await User.findOne({ username });

  const offerId = req.params.id;
  const offer = await Trade.findById(offerId);

  if (!offer) return res.badRequest('Trade not found');
  if (offer.seller.toString() !== user._id) return res.badRequest('Unauthorized to delete this offer');

  await Trade.deleteOne({_id: offerId});

  const cardEntry = user.cards.find(c => c.card === offer.card);
  cardEntry.count += 1;
  await user.save();

  res.success();
}));

router.post('/offer', asyncMiddleware(async (req, res) => {
  const username = req.user.username;
  const { offerId, offeredCardIds } = req.body;

  if (offeredCardIds.length === 0)
    return res.badRequest('Cannot make an empty offer');

  const tradeOffer = await Trade.findById(offerId).populate('card seller');
  if (!tradeOffer) return res.badRequest('Trade offer not found');

  const buyer = await User.findOne({ username });
  if (buyer._id === tradeOffer.seller._id) return res.badRequest('Cannot trade own cards');

  const offeredCards = buyer.cards.filter(card => offeredCardIds.includes(card.card) && card.count > 1);
  if (offeredCards.length !== offeredCardIds.length) return res.badRequest('Invalid cards in offer');

  tradeOffer.offers.push({
    buyer: buyer._id,
    cards: offeredCardIds
  });

  await tradeOffer.save();
  res.success();
}));


router.post('/accept', asyncMiddleware(async (req, res) => {
  const username = req.user.username;
  const { offerId, selectedOfferId } = req.body;  // `offerId` is the trade, `selectedOfferId` is the offer to accept

  const tradeOffer = await Trade.findById(offerId).populate('card offers.buyer');
  if (!tradeOffer) return res.badRequest('Trade not found');

  // Ensure current user is the seller
  const user = await User.findOne({ username });
  if (tradeOffer.seller.toString() !== user._id.toString()) return res.badRequest('Unauthorized to accept this offer');

  // Find the selected offer to accept
  const selectedOffer = tradeOffer.offers.find(o => o._id.toString() === selectedOfferId);
  if (!selectedOffer) return res.badRequest('Selected offer not found');

  // Validate that the buyer still owns the offered cards
  const buyer = await User.findById(selectedOffer.buyer._id)
    .populate('cards.card')
    .exec();

  const buyerCardEntries = buyer.cards.filter(c => selectedOffer.cards.includes(c.card._id) && c.count > 1);
  if (buyerCardEntries.length !== selectedOffer.cards.length) return res.badRequest('Buyer no longer has valid cards for trade');

  // Execute the trade:
  // 1. Transfer buyer's cards to seller
  selectedOffer.cards.forEach(cardId => {
    const buyerCard = buyer.cards.find(c => c.card._id === cardId);
    buyerCard.count -= 1;

    const sellerCard = user.cards.find(c => c.card === cardId);
    if (sellerCard) {
      sellerCard.count += 1;
    } else {
      user.cards.push({ card: cardId, count: 1 });
    }
  });

  // 2. Transfer the trade card from seller to buyer
  const tradeCardEntry = user.cards.find(c => c.card === tradeOffer.card._id);
  tradeCardEntry.count -= 1;
  if (tradeCardEntry.count === 0) {
    user.cards = user.cards.filter(c => c.card !== tradeOffer.card.toString());
  }

  const buyerTradeCardEntry = buyer.cards.find(c => c.card === tradeOffer.card._id);
  if (buyerTradeCardEntry) {
    buyerTradeCardEntry.count += 1;
  } else {
    buyer.cards.push({ card: tradeOffer.card._id, count: 1 });
  }

  // Save changes to buyer and seller
  await buyer.save();
  await user.save();

  // Remove the accepted trade offer
  await Trade.deleteOne({ _id: offerId });

  res.success();
}));



module.exports = router;