// app.js

const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3800;

app.set('view engine', 'ejs');

const ITEMS_PER_PAGE = 20;

const fetchPokemonList = async (offset) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${ITEMS_PER_PAGE}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokémon list:', error.message);
    throw error;
  }
};

app.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * ITEMS_PER_PAGE;
    const pokemonList = await fetchPokemonList(offset);

    res.render('index', {
      pokemonList: pokemonList.results,
      currentPage: page,
      totalPages: Math.ceil(pokemonList.count / ITEMS_PER_PAGE),
    });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
