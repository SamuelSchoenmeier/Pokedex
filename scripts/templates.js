//              TODO: Icons hinzufügen
function dialogTemplate(currentPokemon, index) {
    return  `
        <button class="dialog-trigger" onclick="openDialog(${index})">
            <div class="dialog-trigger-txt">
                <p>#${currentPokemon.id}</p>
                <p>${currentPokemon.name}</p>
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
        <header>
            <p>#${currentPokemon.id}</p>
            <p>${currentPokemon.name}</p>
        </header>

        <section>
            <img
                src="${currentPokemon.sprites.front_default}"
                alt="${currentPokemon.name}">
            <div>
                hier kommen die icons hin
            </div>
        </section>
        
        <section>
            <nav>
                <button>main</button>
                <button>stats</button>
                <button>evo chain</button>
            </nav>
            <div>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </section>
            `;
}