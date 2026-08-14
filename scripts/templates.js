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
        <section class="dialog-container ${currentPokemon.color}">
            <div class="dialog-header">
                <h2>${currentPokemon.name}</h2>
                <p>#${currentPokemon.id}</p>
            </div>

            <div class="img-icon-container">
                
                <div class="icon-container" style="padding:4px 0;">
                    ${currentPokemon.types.map(type => `
                        <img
                            class="icon-dialog ${type.type.name}"
                            src="../downloads/icons/${type.type.name}.svg"
                            alt="${type.type.name}">
                    `).join("")}
                </div>

                <img
                    class="dialog-img"
                    src="${currentPokemon.sprites.other["official-artwork"].front_default}"
                    alt="${currentPokemon.name}">

            </div>
        </section>
        
        <section>
            <nav class="nav-dialog">
                <button onclick="openMain()" class="nav-dialog-btn nav-btn-left">main</button>
                <button onclick="openStats()" class="nav-dialog-btn">stats</button>
                <button onclick="openEvolution()" class="nav-dialog-btn nav-btn-right">evo chain</button>
            </nav>

            <div class="pok-info" id="main">
                <table>
                    <tr>
                        <th class="main-wrapper">Height</th>
                        <th class="main-wrapper">: ${currentPokemon.height} m</th>
                    </tr>
                    <tr>
                        <th class="main-wrapper">Weight</th>
                        <th class="main-wrapper">: ${currentPokemon.weight} kg</th>
                    </tr>
                    <tr>
                        <th class="main-wrapper">Base esperience</th>
                        <th class="main-wrapper">: ${currentPokemon.base_experience}</th>
                    </tr>
                    <tr>
                        <th class="main-wrapper">Abilities</th>
                        <th class="main-wrapper">: ${currentPokemon.abilities
                                    .map(ability => ability.ability.name)
                                    .join(", ")}
                        </th>
                    </tr>
                </table>
            </div>

            <div id="stats" class="empty pok-info">
                <table>
                    <tr>
                        <th class="stats-wrapper">Hp</th>
                        <th class="stats-wrapper">
                            <div class="progress" role="progressbar" aria-label="Danger example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 215px; margin-left: 20px; border:solid #740303;">
                                <div class="progress-bar bg-danger" style="width: ${currentPokemon.stats[0].base_stat}%"></div>
                            </div>
                        </th>
                    </tr>
                    <tr>
                        <th class="stats-wrapper">Attack</th>
                        <th class="stats-wrapper">
                            <div class="progress" role="progressbar" aria-label="Danger example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 215px; margin-left: 20px; border:solid #740303;">
                                <div class="progress-bar bg-danger" style="width: ${currentPokemon.stats[1].base_stat}%"></div>
                            </div>
                        </th>
                    </tr>
                    <tr>
                        <th class="stats-wrapper">Defense</th>
                        <th class="stats-wrapper">
                            <div class="progress" role="progressbar" aria-label="Danger example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 215px; margin-left: 20px; border:solid #740303;">
                                <div class="progress-bar bg-danger" style="width: ${currentPokemon.stats[2].base_stat}%"></div>
                            </div>
                        </th>
                    </tr>
                    <tr>
                        <th class="stats-wrapper">Special-attack</th>
                        <th class="stats-wrapper">
                            <div class="progress" role="progressbar" aria-label="Danger example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 215px; margin-left: 20px; border:solid #740303;">
                                <div class="progress-bar bg-danger" style="width: ${currentPokemon.stats[3].base_stat}%"></div>
                            </div>
                        </th>
                    </tr>
                    <tr>
                        <th class="stats-wrapper">Special-defense</th>
                        <th class="stats-wrapper">
                            <div class="progress" role="progressbar" aria-label="Danger example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 215px; margin-left: 20px; border:solid #740303;">
                                <div class="progress-bar bg-danger" style="width: ${currentPokemon.stats[4].base_stat}%"></div>
                            </div>
                        </th>
                    </tr>
                    <tr>
                        <th class="stats-wrapper">Speed</th>
                        <th class="stats-wrapper">
                            <div class="progress" role="progressbar" aria-label="Danger example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 215px; margin-left: 20px; border:solid #740303;">
                                <div class="progress-bar bg-danger" style="width: ${currentPokemon.stats[5].base_stat}%"></div>
                            </div>
                        </th>
                    </tr>
                </table>
            </div>

            <div id="evolution" class="empty pok-info">asdasdasd</div>
        </section>

        <section class="dialog-footer">
            <button class="next-presvius-btn" onclick="changePokemon(${index}, -1)">
                <img src="./img/left-right-btn.png" alt="previous">
            </button>

            <button class="next-presvius-btn" onclick="changePokemon(${index}, 1)">
                <img src="./img/left-right-btn.png" alt="next" style="transform: scaleX(-1);">
            </button>
                </section>
            `;
}