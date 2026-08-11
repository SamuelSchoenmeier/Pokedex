const BASE_URL = "https://pokeapi.co/api/v2/";

let pokemon = [];

let limit = 20;
let offset = 0;
let isLoading = false;

function init() {
    loadPokemon();
}

function renderContent() {
    let contentRef = document.getElementById("trigger");
    contentRef.innerHTML = "";

    for (let pokIndex = 0; pokIndex < pokemon.length; pokIndex++) {
        contentRef.innerHTML += dialogTemplate(pokemon[pokIndex], pokIndex);
    }
}

async function loadPokemon() {
    if (isLoading) return;
    isLoading = true;

    let response = await loadData(`pokemon?limit=${limit}&offset=${offset}`);

    for (let currentPokemon of response.results) {
        let pokemonDetails = await loadDataFromUrl(currentPokemon.url);
        
        let speciesDetails = await loadDataFromUrl(
            pokemonDetails.species.url
        );

        pokemonDetails.color = speciesDetails.color.name;

        pokemon.push(pokemonDetails);

        console.log(pokemonDetails);     // console log
    }

    renderContent();

    offset += limit;
    isLoading = false;
}

async function loadData(path="") {
    let response = await fetch(BASE_URL + path);
    let responseToJson = await response.json();
    return responseToJson;
}

async function loadDataFromUrl(url) {
    let response = await fetch(url);
    let responseToJson = await response.json();
    return responseToJson;
}

function openDialog(index) {
    let dialogRef = document.getElementById("dialog");
    dialogRef.innerHTML = triggerDialogTemplate(pokemon[index]);
    dialogRef.showModal();
}

function closeDialog() {
    let dialogRef = document.getElementById("dialog");

    dialogRef.addEventListener("click", function(event) {
        if (event.target === dialogRef) {
            dialogRef.close();
        }
    });
}

function openStats() {
    document.getElementById("main").classList.add("empty");
    document.getElementById("stats").classList.remove("empty");
    document.getElementById("evolution").classList.add("empty");
}

function openMain() {
    document.getElementById("main").classList.remove("empty");
    document.getElementById("stats").classList.add("empty");
    document.getElementById("evolution").classList.add("empty");
}

function openEvolution() {
    document.getElementById("evolution").classList.remove("empty");
    document.getElementById("main").classList.add("empty");
    document.getElementById("stats").classList.add("empty");
}