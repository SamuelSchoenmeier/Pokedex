let pokemon = [];
let pokemonNames = [];

let limit = 20;
let offset = 0;
let isLoading = false;

function init() {
    loadPokemon();
    closeDialog();
}


function renderContent() {
    let contentRef = document.getElementById("trigger_pokemon");
    contentRef.innerHTML = "";

    for (let pokIndex = 0; pokIndex < pokemonNames.length; pokIndex++) {
        contentRef.innerHTML += dialogTemplate(pokemonNames[pokIndex], pokIndex);
    }
}

function filterAndShowNames() {
    let inputRef = document.getElementById("search_input");
    let filterWord = inputRef.value.toLowerCase().trim();
    let contentRef = document.getElementById("trigger_pokemon");

    if (filterWord === "") {
        pokemonNames = pokemon;
        renderContent();
        return;
    }

    if (filterWord.length < 3) {
        contentRef.innerHTML = "<p>Please enter at least 3 characters.</p>";
        return;
    }
    pokemonNames = pokemon.filter(p => p.name.toLowerCase().includes(filterWord));
    if (pokemonNames.length === 0) {
        contentRef.innerHTML = "<p>No Pokemon found.</p>";
        return;
    }
    renderContent();
}

async function loadPokemon() {
    if (isLoading) return;
    isLoading = true;
    showSpinner();

    try {
        let response = await loadPokemonData();
        await addPokemon(response.results);

        pokemonNames = pokemon;
        renderContent();

        offset += limit;
    } catch (error) {
        console.error("Error loading Pokémon", error);
    }

    hideSpinner();
    isLoading = false;
}

async function loadPokemonData() {
    return await loadData(
        `pokemon?limit=${limit}&offset=${offset}`
    );
}

async function addPokemon(pokemonList) {
    for (let currentPokemon of pokemonList) {
        let details = await fetchWithCache(currentPokemon.url);
        let species = await fetchWithCache(details.species.url);

        details.color = species.color.name;
        details.name = capitalizeName(details.name);

        pokemon.push(details);
    }
}

function capitalizeName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}


function getEvolutionChain(chain) {
    let evolutions = [];

    evolutions.push(chain.species.name);

    if (chain.evolves_to.length > 0) {
        for (let evolution of chain.evolves_to) {
            evolutions.push(...getEvolutionChain(evolution));
        }
    }
    return evolutions;
}

async function loadEvolutionPokemon(evolutionNames) {
    let evolutionPokemon = [];

    for (let evolutionName of evolutionNames) {
        let evolution = await loadData(`pokemon/${evolutionName}`);
        evolutionPokemon.push(evolution);
    }
    return evolutionPokemon;
}

async function changePokemon(id, step) {
    let newIndex = (id + step + pokemonNames.length) % pokemonNames.length;
    
    await loadPokemonDetails(newIndex);
    
    printDialog(pokemonNames[newIndex], newIndex);
}

function showSpinner() {
    let spinner = document.querySelector(".loading-spinner-container");
    if (spinner) {
        spinner.classList.remove("d-none");
        document.body.style.overflow = "hidden";
    }
}

function hideSpinner() {
    let spinner = document.querySelector(".loading-spinner-container");
    if (spinner) {
        spinner.classList.add("d-none");
        document.body.style.overflow = "";
    }
}