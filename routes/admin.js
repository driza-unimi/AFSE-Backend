const express = require('express');
const router = express.Router();
const Offer = require('../models/offer');
const asyncMiddleware = require('../middlewares/asyncMiddleware');

router.post('/update/offer/', asyncMiddleware(async (req, res) => {
    const { id, valid } = req.body;

    const result = await Offer.findByIdAndUpdate(
        id,
        { $set: { valid } },
        );

    if (!result) {
        return res.badRequest('Offer not found' );
    }

    res.success();
}));

module.exports = router;