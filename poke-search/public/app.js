const getPokemonData = async (pokemonName) => {
    try {
        const response = await fetch(`/pokemon/${pokemonName}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching Pokémon data:", error);
    }
};

async function displayPokemonInfo(pokemonName) {
    const pokemonInfo = document.getElementById("pokemon-info");
    pokemonInfo.innerHTML = "<p>Loading...</p>";

    const data = await getPokemonData(pokemonName);

    if (data) {
        // Convert height from decimetres to meters
        const heightInMeters = data.height / 10;

        // Convert weight from hectograms to kilograms
        const weightInKilograms = data.weight / 10;

        // Get the first two types of the Pokémon (if available)
        const types = data.types.map((type) => type.type.name).slice(0, 2);

        const typeColors = {
            normal: '#A8A77A',
            fire: '#EE8130',
            water: '#6390F0',
            electric: '#F7D02C',
            grass: '#7AC74C',
            ice: '#96D9D6',
            fighting: '#C22E28',
            poison: '#A33EA1',
            ground: '#E2BF65',
            flying: '#A98FF3',
            psychic: '#F95587',
            bug: '#A6B91A',
            rock: '#B6A136',
            ghost: '#735797',
            steel: '#B7B7CE',
            dragon: '#6F35FC',
            dark: '#705746',
            fairy: '#D685AD',
        };

        // Generate style for each type label (button-like)
        const typeLabels = types.map(type => `<span class="type-label" style="background-color: ${typeColors[type]}">${type}</span>`).join('');

        const html = `
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Type(s):</strong> ${typeLabels}</p>
            <p><strong>Height:</strong> ${heightInMeters} m</p>
            <p><strong>Weight:</strong> ${weightInKilograms} kg</p>
            <img src="${data.sprites.front_default}" alt="${data.name}">
        `;
        pokemonInfo.innerHTML = html;
    }
}

// Example usage:
const pokemonName = prompt("Enter a Pokémon name:");
displayPokemonInfo(pokemonName);
