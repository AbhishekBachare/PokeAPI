
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3800;

app.set('view engine', 'ejs');

const fetchAllPokemon = async () => {
  const allPokemon = [];
  let nextUrl = 'https://pokeapi.co/api/v2/pokemon';

  while (nextUrl) {
    try {
      const response = await axios.get(nextUrl);
      allPokemon.push(...response.data.results);
      nextUrl = response.data.next;
    } catch (error) {
      console.error('Error fetching Pokémon data:', error.message);
      throw error;
    }
  }

  return allPokemon;
};

app.get('/', async (req, res) => {
  try {
    const pokemonList = await fetchAllPokemon();
    res.render('index', { pokemonList });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
