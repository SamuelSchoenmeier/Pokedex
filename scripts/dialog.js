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