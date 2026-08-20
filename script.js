const BASE_URL = "https://pokeapi.co/api/v2/";

let pokemon = [];
let pokemonNames = [];

let apiCache = {};

let limit = 20;
let offset = 0;
let isLoading = false;

function init() {
    loadPokemon();
    closeDialog();
}

async function fetchWithCache(url) {
    if (apiCache[url]) {
        return apiCache[url];
    }
    let response = await fetch(url);
    let data = await response.json();
    apiCache[url] = data;
    return data
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
    let filterWord = inputRef ? inputRef.value.toLowerCase().trim() : "";

    if (filterWord === "") {
        pokemonNames = pokemon;
    } else {
        pokemonNames = pokemon.filter(p => p.name.toLowerCase().includes(filterWord));
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
        filterAndShowNames();
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

async function processPokemon(pokemonList) {

}

async function loadData(path="") {
    return await fetchWithCache(BASE_URL + path);
}

async function loadDataFromUrl(url) {
    let response = await fetch(url);
    let responseToJson = await response.json();
    return responseToJson;
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

async function openDialog(index) {
    await loadPokemonDetails(index);

    let selectedPokemon = pokemonNames[index];
    printDialog(selectedPokemon, index);

    let dialogRef = document.getElementById("dialog");
    dialogRef.showModal();

    document.body.style.overflow = "hidden";
}

function closeDialog() {
    let dialogRef = document.getElementById("dialog");
    dialogRef.close();

    document.body.style.overflow = "";
}

function checkBackdropClick(event) {
    let dialogRef = document.getElementById("dialog");
    if (event.target === dialogRef) {
        closeDialog();
    }
}

function openStats() {
    document.getElementById("main").classList.add("d-none");
    document.getElementById("stats").classList.remove("d-none");
    document.getElementById("evolution").classList.add("d-none");
}

function openMain() {
    document.getElementById("main").classList.remove("d-none");
    document.getElementById("stats").classList.add("d-none");
    document.getElementById("evolution").classList.add("d-none");
}

function openEvolution() {
    document.getElementById("evolution").classList.remove("d-none");
    document.getElementById("main").classList.add("d-none");
    document.getElementById("stats").classList.add("d-none");
}

function printDialog(currentPokemon, index) {
    let dialogRef = document.getElementById("dialog");
    dialogRef.innerHTML = triggerDialogTemplate(currentPokemon, index);
}

async function changePokemon(id, step) {
    let newIndex = (id + step + pokemonNames.length) % pokemonNames.length;
    
    await loadPokemonDetails(newIndex);
    
    printDialog(pokemonNames[newIndex], newIndex);
}

async function loadPokemonDetails(index) {
    let selectedPokemon = pokemonNames[index];

    if (!selectedPokemon.evolutionPokemon) {
        let speciesDetails = await fetchWithCache(selectedPokemon.species.url);
        selectedPokemon.color = speciesDetails.color.name;

        let evolutionDetails = await fetchWithCache(speciesDetails.evolution_chain.url);
        let evolutionNames = getEvolutionChain(evolutionDetails.chain);

        selectedPokemon.evolution = evolutionNames;
        selectedPokemon.evolutionPokemon = await loadEvolutionPokemon(evolutionNames);
    }
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