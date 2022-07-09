const sequelize = require('../config/connection');
const Pokemon = require('../models/Pokemon');

const pokemonData = require('./pokemon.json')
const pokedexData = require('./pokedex.json');
const Pokedex = require('../models/Pokedex');


const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    

    for (const item of pokemonData){
        await Pokemon.create({
            ...item
        })
        
    }

    for (const item of pokedexData){
        await Pokedex.create({
            ...item
        })
    }
    process.exit(0);

}
seedDatabase()