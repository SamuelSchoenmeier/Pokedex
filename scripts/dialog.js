async function openDialog(index) {
    let dialogRef = document.getElementById("dialog");
    let contentRef = document.getElementById("dialog-content");

    contentRef.innerHTML = "";
    dialogRef.showModal();

    document.body.style.overflow = "hidden";
    showDialogSpinner();

    try {
        await loadPokemonDetails(index);
        printDialog(pokemonNames[index], index);
    } catch (error) {
        console.error("Error opening Pokémon", error);
    }

    hideDialogSpinner();
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
    let contentRef = document.getElementById("dialog-content");

    contentRef.innerHTML =
        triggerDialogTemplate(currentPokemon, index);
}

async function loadPokemonDetails(index) {
    let selectedPokemon = pokemonNames[index];

    if (!selectedPokemon.evolutionPokemon) {
        let speciesDetails = await fetchWithCache(
            selectedPokemon.species.url
        );

        selectedPokemon.color = speciesDetails.color.name;

        let evolutionDetails = await fetchWithCache(
            speciesDetails.evolution_chain.url
        );

        let evolutionNames =
            getEvolutionChain(evolutionDetails.chain);

        selectedPokemon.evolution = evolutionNames;

        selectedPokemon.evolutionPokemon =
            await loadEvolutionPokemon(evolutionNames);
    }
}