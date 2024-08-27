const Offer = require('../models/Offer');

module.exports = async () => {
    try {
        const offers = [
            {
                name: 'Starter Pack',
                cost: 0.99,
                type: 'credit',
                valid: true,
                value: 90,
                description: 'Get started with 90 credits, perfect for beginners.'
            },
            {
                name: 'Booster Pack',
                cost: 4.99,
                type: 'credit',
                valid: false,
                value: 550,
                description: 'Boost your game with 550 credits for a great value.'
            },
            {
                name: 'Hero Pack',
                cost: 9.99,
                type: 'credit',
                valid: false,
                value: 1200,
                description: 'Become a hero with 1200 credits, ideal for serious players.'
            },
            {
                name: 'Champion Pack',
                cost: 99.99,
                type: 'credit',
                valid: false,
                value: 14000,
                description: 'Champion-level value with 14,000 credits for maximum advantage.'
            },
            {
                name: 'Basic Card Pack',
                cost: 50,
                type: 'pack',
                valid: true,
                value: 5,
                description: 'Get 5 cards in this basic pack, a great entry-level choice.'
            },
            {
                name: 'Premium Card Pack',
                cost: 100,
                type: 'pack',
                valid: false,
                value: 9,
                description: 'Upgrade to a premium pack with 9 cards, offering better chances.'
            },
            {
                name: 'Elite Card Pack',
                cost: 1000,
                type: 'pack',
                valid: false,
                value: 15,
                description: '15 exclusive cards in this elite pack, no common cards included.'
            },
            {
                name: 'Legendary Pack',
                cost: 5000,
                type: 'pack',
                valid: false,
                value: 1,
                description: 'Guaranteed 1 legendary card in this high-stakes pack.'
            }
        ];

        for (const offer of offers) {
            if (await Offer.findOne( {name: offer.name})) continue;

            const newOffer = new Offer({
                name: offer.name,
                cost: offer.cost,
                type: offer.type,
                valid: offer.valid,
                value: offer.value,
                description: offer.description,
            })
            await newOffer.save();
            console.log(`offers ${offer.name} saved successfully`);
        }

        console.log('All offers are created successfully');
    } catch (error) {
        console.error('Error seeding offers:', error);
    }
}
