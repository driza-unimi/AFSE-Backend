require('dotenv').config();

const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

const seedAdminUser = require('./seedAdminUser');
const seedHeroesCollection = require('./seedHeroesCollection');
const seedOfferCollection = require('./seedOffers');

mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.log('Failed to connect to MongoDB', err)
        process.exit(1);
    });

const runSeeds = async () => {
    try {

        await Promise.all([
            seedAdminUser(),
            seedHeroesCollection(),
            seedOfferCollection()
        ]);

        // await seedAdminUser();
        // await seedHeroesCollection();
        // await seedOfferCollection();

        console.log('All seeding operations completed successfully');
    } catch (error) {
        console.error('Error running seed operations:', error);
    } finally {
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
        process.exit(0);
    }
}

runSeeds();
