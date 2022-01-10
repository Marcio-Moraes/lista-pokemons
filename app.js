const addZeros = (num, limiteZeros) => {
    var numerosComZeros = String(num);
    var contar = numerosComZeros.length;

    while (contar < limiteZeros) {
        numerosComZeros = "0" + numerosComZeros;

        contar++;
    }
    return numerosComZeros;
}


for (let m = 1; m <= 150; m++) {
    addZeros(m, 3);
}

const fetchPokemon = () => {
    const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;




    const pokemonPromises = []

    for (let i = 1; i <= 150; i++) {
        pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))
    }

    Promise.all(pokemonPromises)
        .then(pokemons => {
            const lisPokemons = pokemons.reduce((accumulator, pokemon) => {
                const types = pokemon.types.map(typeInfo => typeInfo.type.name)

                accumulator += `
                    <li class="card ${types[0]}">
                        <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${addZeros(pokemon.id, 3)}.png" class="card-image" alt="${pokemon.name}" />
                        <h2 class="card-title">${pokemon.id} ${pokemon.name}</h2>
                        <p class="card-subtitle">${types.join(' | ')}</p>
                    </li>
                `
                return accumulator
            }, '')

            const ul = document.querySelector('[data-js="pokedex"]')

            // console.log(ul.innerHTML);
            ul.innerHTML = lisPokemons
        })
}

fetchPokemon()