const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3801;

app.use(express.static('public'));

const baseURL = "https://pokeapi.co/api/v2/pokemon/";

app.get('/pokemon/:name', async (req, res) => {
    const pokemonName = req.params.name;
    const data = await getPokemonData(pokemonName);
    res.send(data);
});

async function getPokemonData(pokemonName) {
    try {
        const response = await fetch(`${baseURL}${pokemonName.toLowerCase()}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching Pokémon data:", error);
    }
}

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
