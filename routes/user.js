const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Offer = require('../models/offer');
const Hero = require('../models/hero');
const asyncMiddleware = require('../middlewares/asyncMiddleware');

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
        if (user.credit < offer.cost) return res.badRequest('Not enough credit');

        let matchCondition = {};
        if (offer.name === 'Elite Card Pack') {
            matchCondition.rarity = { $ne: 'common' };
        } else if (offer.name === 'Legendary Pack') {
            matchCondition.rarity = 'legendary';
        }

        const randomCards = await Hero.aggregate([
            { $match: matchCondition },
            { $sample: { size: offer.value } }
        ]);

        for (hero of randomCards) {
            const existingHero = user.cards.find(c => c._id.equals(hero._id));
            if (existingHero) {
                existingHero.count = (existingHero.count || 0) + 1;
            } else {
                user.cards.push(hero);
            }
        }

        user.save();
    }

    res.success();
}));


module.exports = router;