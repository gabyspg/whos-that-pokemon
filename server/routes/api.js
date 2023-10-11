const express = require('express');
const pokemonController = require('../controllers/pokemonController');
const userController = require('../controllers/userController');
const Pokemon = require('../models/pokemonModels');


const router = express.Router();
router.use(express.json())

//Route to retieve random pokemon data using the getpokemon middleware from pokemon controller
//Returns the json responce containing the random pokemon data
router.get('/', pokemonController.getPokemon, (req, res) => {
  return res.status(200).json(res.locals.randomPokemon);
})

// This router is designed to populate your database. It looks unconventional, but it does work.
// Essentially, the router calls our middleware function, fetchPokemonData, to populate an array
// of pokemon objects from the 3rd party api. It runs pokemon.create on this array, which then populates
// the database with all of the pokemon names and image URLs. Note, you will need to provide your own
// mongoDB connection URL.

// router.get('/fetch-and-store-pokemons', async (req, res) => {
//     try {
//       const pokemonDataList = await pokemonController.fetchPokemonData();
//       await Pokemon.create(pokemonDataList);
//       console.log(`Stored ${pokemonDataList.length} Pokémon in the database.`);
//       res.json({ message: `Stored ${pokemonDataList.length} Pokémon in the database.` });
//     } catch (error) {
//       console.error(`Error fetching/storing data for Pokémon: ${error.message}`);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
// });



  module.exports = router;