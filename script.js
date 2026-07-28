const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=20";

async function loadData() {
    let response = await fetch(BASE_URL + ".json");
    let responseToJson = await response.json();
    console.log(responseToJson);
    
}