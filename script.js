const BASE_URL = "https://pokeapi.co/api/v2/";

async function onloadFunc() {
    let responseToJson = await loadData("pokemon?limit=20");
    renderContent(responseToJson.results);
}

async function loadData(path="") {
    let response = await fetch(BASE_URL + path);
    let responseToJson = await response.json();
    console.log(responseToJson);
    return responseToJson;
}

function renderContent(pokemonList) {
    let contentRef = document.getElementById("content");
    contentRef.innerHTML = "";

    pokemonList.forEach(pokemon => {
        contentRef.innerHTML += `
        <div>${pokemon.name}</div>`
    });
}