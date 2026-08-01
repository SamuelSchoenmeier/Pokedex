//              TODO: Icons hinzufügen
function dialogTemplate(currentPokemon) {
    return  `
        <button onclick="openDialog(index)">
            <div class="dialog-trigger-txt">
                <p>#${currentPokemon.id}</p>
                <p>${currentPokemon.name}</p>
            </div>
            <img
                src="${currentPokemon.sprites.front_default}"
                alt="${currentPokemon.name}">
        </button>
            `;
}

function triggerDialogTemplate(currentPokemon, index) {
    return  `<div>
                <div>${currentPokemon.name}</div>
                <div>${currentPokemon.id}</div>
            </div>`
}triggerDialogTemplate