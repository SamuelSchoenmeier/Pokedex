let pokemon = [];
let pokemonNames = [];
let allPokemonNames = [];

let limit = 20;
let offset = 0;
let isLoading = false;

const TYPE_COLORS = {
    fire: "red",
    water: "blue",
    grass: "green",
    electric: "yellow",
    psychic: "pink",
    ice: "lightblue",
    dragon: "purple",
    dark: "black",
    fairy: "pink",
    normal: "gray",
    fighting: "orange",
    flying: "indigo",
    poison: "purple",
    ground: "brown",
    rock: "gray",
    bug: "lightgreen",
    ghost: "purple",
    steel: "gray"
};

async function init() {
    await loadAllPokemonNames();
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

async function loadAllPokemonNames() {
    let response = await loadData("pokemon?limit=10000");

    allPokemonNames = response.results.filter(p =>
        !p.name.includes("-")
    );
}

function filterAndShowNames(event) {
    event.preventDefault();

    let inputRef = document.getElementById("search_input");
    let filterWord = inputRef.value.toLowerCase().trim();
    search(filterWord);
}

function search(filterWord) {
    if (filterWord === "") {
        showAllPokemon();
        return;
    }

    if (filterWord.length < 3) {
        showSearchMessage();
        return;
    }

    filterPokemon(filterWord);
}

async function filterPokemon(filterWord) {
    let results = allPokemonNames.filter(p =>
        p.name.includes(filterWord)
    );

    if (results.length === 0) {
        noPokemonFound();
        return;
    }

    await loadSearchResults(results);
}

function showAllPokemon() {
    document.getElementById("search_input").value = "";
    pokemonNames = pokemon;
    renderContent();
    loadMoreButton();
}

function showSearchMessage() {
    document.getElementById("trigger_pokemon").innerHTML = "<p>Please enter at least 3 characters.</p>";
}

function noPokemonFound() {
    document.getElementById("trigger_pokemon").innerHTML = '<p data-id="not-found">No Pokemon found.</p>';
}

async function loadPokemon() {
    if (isLoading) return;
    isLoading = true;
    showSpinner();

    try {
        await loadPokemonContent();
    } catch (error) {
        console.error("Error loading Pokémon", error);
    }

    hideSpinner();
    isLoading = false;
}

async function loadPokemonContent() {
    let response = await loadPokemonData();
    await addPokemon(response.results);
    pokemonNames = pokemon;
    renderContent();
    offset += limit;
}

async function loadPokemonData() {
    return await loadData(
        `pokemon?limit=${limit}&offset=${offset}`
    );
}

function getPokemonColor(details) {
    if (details.types && details.types.length > 0) {
        let primaryType = details.types[0].type.name;
        return TYPE_COLORS[primaryType] || "gray";
    }
    return "gray";
}

async function loadSearchPokemon(result) {
    let details = await fetchWithCache(result.url);

    details.color = getPokemonColor(details);
    details.name = capitalizeName(details.name);

    return details;
}

async function loadSearchResults(results) {
    showSpinner();
    pokemonNames = [];

    try {
        await loadSearchPokemonList(results);
        renderContent();
        showAllButton();
    } catch (error) {
        console.error("Error searching Pokémon", error);
    }

    hideSpinner();
}

async function loadSearchPokemonList(results) {
    for (let result of results) {
        let currentPokemon = pokemon.find(
            p => p.name.toLowerCase() === result.name
        );

        if (!currentPokemon) {
            currentPokemon = await loadSearchPokemon(result);
            pokemon.push(currentPokemon);
        }

        pokemonNames.push(currentPokemon);
    }
}

async function addPokemon(pokemonList) {
    for (let currentPokemon of pokemonList) {
        let details = await fetchWithCache(currentPokemon.url);

        details.color = getPokemonColor(details);
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

function showAllButton() {
    let button = document.getElementById("trigger");
    
    button.innerHTML = `
        <button
            class="load-more-btn"
            onclick="showAllPokemon()"
            data-id="load-all-btn">
            Show All Pokemon
        </button>
    `;
}

function loadMoreButton() {
    document.getElementById("trigger").innerHTML = `
        <button
            class="load-more-btn"
            onclick="loadPokemon()"
            data-id="load-more-btn"
            aria-label="load more pokemons">
            Load More
        </button>
    `;
}