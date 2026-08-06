//              TODO: Icons hinzufügen
function dialogTemplate(currentPokemon, index) {
    return  `
        <button class="dialog-trigger" onclick="openDialog(${index})">
            <div class="dialog-trigger-txt">
                <p>#${currentPokemon.id}</p>
                <h2>${currentPokemon.name}</h2>
            </div>

            <div class="img-container">
                <img
                    class="dialog-thumbnail"
                    src="${currentPokemon.sprites.other["official-artwork"].front_default}"
                    alt="${currentPokemon.name}"
                >
            </div>
            
            <div class="icon-container">
                ${currentPokemon.types.map(type => `
                    <img
                        class="icon ${type.type.name}"
                        src="../downloads/icons/${type.type.name}.svg"
                        alt="${type.type.name}">
                `).join("")}
            </div>
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
                src="${currentPokemon.sprites.other["official-artwork"].front_default}"
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
                <table>
                    <tr>
                        <th>Height</th>
                        <th>: ${currentPokemon.height} m</th>
                    </tr>
                    <tr>
                        <th>Weight</th>
                        <th>: ${currentPokemon.weight} kg</th>
                    </tr>
                    <tr>
                        <th>Base esperience</th>
                        <th>: ${currentPokemon.base_experience}</th>
                    </tr>
                    <tr>
                        <th>Abilities</th>
                        <th>: ${currentPokemon.abilities[0].ability.name},
                        ${currentPokemon.abilities[1].ability.name}</th>
                    </tr>
                </table>
            </div>

            <div></div>

            <div></div>
        </section>
            `;
}