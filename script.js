const BASE_URL = "https://pokeapi.co/api/v2/";

let pokemon = [];

function init() {
    onloadFunc()
}

async function onloadFunc() {
    let responseToJson = await loadData("pokemon?limit=20");
    console.log(responseToJson);
    

    for (let currentPokemon of responseToJson.results) {
        let pokemonDetails = await loadDataFromUrl(currentPokemon.url);
        pokemon.push(pokemonDetails);
        console.log(pokemonDetails);
        
    }

    renderContent();
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

function renderContent() {
    let contentRef = document.getElementById("trigger");
    contentRef.innerHTML = "";

    for (let pokIndex = 0; pokIndex < pokemon.length; pokIndex++) {
        contentRef.innerHTML += dialogTemplate(pokemon[pokIndex], pokIndex);
    }
}

function openDialog(index) {
    let dialogRef = document.getElementById("dialog");
    dialogRef.innerHTML = triggerDialogTemplate(pokemon[index]);
    dialogRef.showModal();
}

function closeDialog() {
    document.getElementById("dialog").close();
}