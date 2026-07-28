const BASE_URL = "https://pokeapi.co/api/v2/";

function onloadFunc() {
    loadData("pokemon?limit=20");
}

async function loadData(path="") {
    let response = await fetch(BASE_URL + path + ".json");
    let responseToJson = await response.json();
    console.log(responseToJson);
}