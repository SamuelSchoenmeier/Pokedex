//              TODO: Icons hinzufügen
function dialogTemplate(currentPokemon, index) {
    return  `
        <button class="dialog-trigger" onclick="openDialog(${index})">
            <div class="dialog-trigger-txt">
                <p>#${currentPokemon.id}</p>
                <h2>${currentPokemon.name}</h2>
            </div>
            <img
                class="dialog-thumbnail"
                src="${currentPokemon.sprites.front_default}"
                alt="${currentPokemon.name}">
        </button>
            `;
}

function triggerDialogTemplate(currentPokemon, index) {
    return  `
        <div class="dialog-header">
            <p>#${currentPokemon.id}</p>
            <h2>${currentPokemon.name}</h2>
        </div>

        <section>
            <img
                class="dialog-img"
                src="${currentPokemon.sprites.front_default}"
                alt="${currentPokemon.name}">
            <div class="dialog-icons">
                hier kommen die icons hin
            </div>
        </section>
        
        <section>
            <nav class="nav-dialog">
                <button class="nav-dialog-btn">main</button>
                <button class="nav-dialog-btn">stats</button>
                <button class="nav-dialog-btn">evo chain</button>
            </nav>
            <div>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </section>
            `;
}