const BASE_URL = "https://pokeapi.co/api/v2/";

let apiCache = {};

async function fetchWithCache(url) {
    if (apiCache[url]) {
        return apiCache[url];
    }
    let response = await fetch(url);
    let data = await response.json();
    apiCache[url] = data;
    return data
}

async function loadData(path="") {
    return await fetchWithCache(BASE_URL + path);
}

async function loadDataFromUrl(url) {
    let response = await fetch(url);
    let responseToJson = await response.json();
    return responseToJson;
}