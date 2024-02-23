const getPokemonData = async (pokemonName) => {
    try {
        const response = await fetch(`/pokemon/${pokemonName}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching Pokémon data:", error);
    }
};

const displayPokemonInfo = async (pokemonName) => {
    const pokemonInfo = document.getElementById("pokemon-info");
    pokemonInfo.innerHTML = "<p>Loading...</p>";

    const data = await getPokemonData(pokemonName);

    if (data) {
        // Convert height from decimetres to meters
        const heightInMeters = data.height / 10;

        // Convert weight from hectograms to kilograms
        const weightInKilograms = data.weight / 10;

        const html = `
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Height:</strong> ${heightInMeters} m</p>
            <p><strong>Weight:</strong> ${weightInKilograms} kg</p>
            <img src="${data.sprites.front_default}" alt="${data.name}">
        `;
        pokemonInfo.innerHTML = html;
    }
};

// Example usage:
const pokemonName = prompt("Enter a Pokémon name:");
displayPokemonInfo(pokemonName);
