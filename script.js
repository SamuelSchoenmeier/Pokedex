const BASE_URL = "https://pokeapi.co/api/v2/";

let pokemon = [];

function init() {
    onloadFunc()
}

async function onloadFunc() {
    let responseToJson = await loadData("pokemon?limit=20");

    for (let currentPokemon of responseToJson.results) {
        let pokemonDetails = await loadDataFromUrl(currentPokemon.url);
        pokemon.push(pokemonDetails);
    }

    renderContent(pokemon);
}

async function loadData(path="") {
    let response = await fetch(BASE_URL + path);
    let responseToJson = await response.json();
    console.log(responseToJson);
    return responseToJson;
}

async function loadDataFromUrl(url) {
    let response = await fetch(url);
    let responseToJson = await response.json();
    return responseToJson;    
}

function renderContent(pokemonList) {
    let contentRef = document.getElementById("content");
    contentRef.innerHTML = "";

    pokemonList.forEach(currentPokemon => {
        contentRef.innerHTML += pokTemplate(currentPokemon)
    });
}