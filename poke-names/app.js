// app.js

const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3800;

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  try {
    // Fetch a list of Pokémon from the PokeAPI
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
    const pokemonList = response.data.results;

    // Render the list of Pokémon on the home page
    res.render('index', { pokemonList });
  } catch (error) {
    console.error('Error fetching Pokémon data:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
