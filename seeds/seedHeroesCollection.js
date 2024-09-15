require('dotenv').config();

const axios = require("axios");
const crypto = require('crypto');
const Hero = require('../models/hero');

const privateKey = process.env.MARVEL_PRIVATE_KEY;
const publicKey = process.env.MARVEL_PUBLIC_KEY;

module.exports = async () => {
    try {
        console.log(`Fetching heroes from Marvel API and seeding database! `);

        const baseURL = 'https://gateway.marvel.com:443/v1/public/characters';
        const ts = new Date().getTime();
        const hash = crypto
            .createHash('md5')
            .update(ts + privateKey + publicKey)
            .digest('hex');

        let offset = await Hero.estimatedDocumentCount();
        let totalHeroesFetched = offset;
        const limit = 20;

        while (true) {
            const response = await axios.get(baseURL, {
                params: {
                    ts,
                    apikey: publicKey,
                    hash,
                    limit,
                    offset,
                },
            });

            const heroes = response.data.data.results;
            if (heroes.length === 0) break;

            for (let hero of heroes) {
                const newHero = new Hero({
                    name: hero.name,
                    image: `${hero.thumbnail.path}/portrait_uncanny.${hero.thumbnail.extension}`,
                    description: hero.description || 'No description available.',
                    rarity: getHeroRarity(totalHeroesFetched),
                    series: hero.series.items,
                    events: hero.events.items,
                    comics: hero.comics.items,
                });
                await newHero.save();
                totalHeroesFetched++;
            }
            offset += limit;

            console.log(`Fetched and saved ${heroes.length} heroes. Moving to next page...`);
        }

        console.log(`All ${totalHeroesFetched} heroes have been fetched and saved.`);
    } catch (error) {
        console.error('Error seeding heroes', error);
    }
}

function getHeroRarity(heroCount) {
    let rarity = 'common';

    if (heroCount < 50) {
        rarity = 'legendary';
    } else if (heroCount < 200) {
        rarity = 'epic';
    } else if (heroCount < 700) {
        rarity = 'rare';
    }

    return rarity;
}