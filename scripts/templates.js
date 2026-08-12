function dialogTemplate(currentPokemon, index) {
    return  `
        <button class="dialog-trigger" onclick="openDialog(${index})">
            <div class="dialog-trigger-txt">
                <p>#${currentPokemon.id}</p>
                <h2>${currentPokemon.name}</h2>
            </div>

            <div class="img-container ${currentPokemon.color}">
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

        <section class="dialog-img-icon-container">
            <img
                class="dialog-img ${currentPokemon.color}"
                src="${currentPokemon.sprites.other["official-artwork"].front_default}"
                alt="${currentPokemon.name}">

            <div class="seperator"></div>

            <div class="icon-container" style="padding:4px 0;">
                ${currentPokemon.types.map(type => `
                    <img
                        class="icon-dialog ${type.type.name}"
                        src="../downloads/icons/${type.type.name}.svg"
                        alt="${type.type.name}">
                `).join("")}
            </div>
        </section>
        
        <section>
            <nav class="nav-dialog">
                <button onclick="openMain()" class="nav-dialog-btn">main</button>
                <button onclick="openStats()" class="nav-dialog-btn">stats</button>
                <button onclick="openEvolution()" class="nav-dialog-btn">evo chain</button>
            </nav>

            <div id="main">
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
                        <th>: ${currentPokemon.abilities
                                    .map(ability => ability.ability.name)
                                    .join(", ")}
                        </th>
                    </tr>
                </table>
            </div>

            <div id="stats" class="empty">
                <table>
                    <tr>
                        <th>hp</th>
                        <th>
                            <div class="progress" role="progressbar" aria-label="Danger example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 215px; margin-left: 50px; border:solid;">
                                <div class="progress-bar bg-danger" style="width: ${currentPokemon.stats[0].base_stat}%"></div>
                            </div>
                        </th>
                    </tr>
                    <tr>
                        <th>attack</th>
                        <th>
                            <div class="progress" role="progressbar" aria-label="Danger example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 215px; margin-left: 50px; border:solid;">
                                <div class="progress-bar bg-danger" style="width: ${currentPokemon.stats[1].base_stat}%"></div>
                            </div>
                        </th>
                    </tr>
                    <tr>
                        <th>defense</th>
                        <th>
                            <div class="progress" role="progressbar" aria-label="Danger example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 215px; margin-left: 50px; border:solid;">
                                <div class="progress-bar bg-danger" style="width: ${currentPokemon.stats[2].base_stat}%"></div>
                            </div>
                        </th>
                    </tr>
                    <tr>
                        <th>special-attack</th>
                        <th>
                            <div class="progress" role="progressbar" aria-label="Danger example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 215px; margin-left: 50px; border:solid;">
                                <div class="progress-bar bg-danger" style="width: ${currentPokemon.stats[3].base_stat}%"></div>
                            </div>
                        </th>
                    </tr>
                    <tr>
                        <th>special-defense</th>
                        <th>
                            <div class="progress" role="progressbar" aria-label="Danger example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 215px; margin-left: 50px; border:solid;">
                                <div class="progress-bar bg-danger" style="width: ${currentPokemon.stats[4].base_stat}%"></div>
                            </div>
                        </th>
                    </tr>
                    <tr>
                        <th>speed</th>
                        <th>
                            <div class="progress" role="progressbar" aria-label="Danger example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 215px; margin-left: 50px; border:solid;">
                                <div class="progress-bar bg-danger" style="width: ${currentPokemon.stats[5].base_stat}%"></div>
                            </div>
                        </th>
                    </tr>
                </table>
            </div>

            <div id="evolution" class="empty">asdasdasd</div>
        </section>
            `;
}