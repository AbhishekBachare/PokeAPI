
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3800;

app.set('view engine', 'ejs');

const ITEMS_PER_PAGE = 20;

const fetchPokemonDetails = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokémon details:', error.message);
    throw error;
  }
};

const fetchPokemonPage = async (offset) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${ITEMS_PER_PAGE}`);
    const pokemonData = await Promise.all(response.data.results.map(async (pokemon) => {
      const details = await fetchPokemonDetails(pokemon.url);
      return {
        name: pokemon.name,
        details,
      };
    }));

    return pokemonData;
  } catch (error) {
    console.error('Error fetching Pokémon data:', error.message);
    throw error;
  }
};

app.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;

  try {
    const offset = (page - 1) * ITEMS_PER_PAGE;
    const pokemonList = await fetchPokemonPage(offset);
    res.render('index', { pokemonList, currentPage: page });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.get('/pokemon/:name', async (req, res) => {
  const pokemonName = req.params.name;

  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const pokemonDetails = response.data;
    res.render('pokemon', { pokemonDetails });
  } catch (error) {
    res.status(404).send('Pokémon not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
