function dialogTemplate(currentPokemon, index) {
    return  `
    <li>
        <button class="dialog-trigger" onclick="openDialog(${index})" data-id="card" aria-haspopup="dialog" aria-controls="dialog" aria-label="open pokemon info">
            <div class="dialog-trigger-txt">
                <h2>${currentPokemon.name}</h2>
            </div>

            <div class="img-container ${currentPokemon.color}">
                <img
                    class="dialog-thumbnail"
                    src="${currentPokemon.sprites.other["official-artwork"].front_default}"
                    alt="${currentPokemon.name}"
                    data-id="card-image"
                >
            </div>
            
            <div class="icon-container">
                ${currentPokemon.types.map(type => `
                    <img
                        title="${type.type.name}"
                        class="icon ${type.type.name}"
                        src="./downloads/icons/${type.type.name}.svg"
                        alt="${type.type.name}">
                `).join("")}
            </div>
        </button>
    </li>
            `;
}

function triggerDialogTemplate(currentPokemon, index) {
    return  `
    <div data-id="overlay-pokemon-name">
        <section class="dialog-container ${currentPokemon.color}">
            <div class="dialog-header">
                <h2 id="dialog_title">${currentPokemon.name}</h2>
                <p>#${currentPokemon.id}</p>
            </div>

            <div class="img-icon-container">
                
                <div class="icon-container" style="padding:4px 0;">
                    ${currentPokemon.types.map(type => `
                        <img
                            title="${type.type.name}"
                            class="icon-dialog ${type.type.name}"
                            src="./downloads/icons/${type.type.name}.svg"
                            alt="${type.type.name}">
                    `).join("")}
                </div>

                <img
                    class="dialog-img"
                    src="${currentPokemon.sprites.other["official-artwork"].front_default}"
                    alt="${currentPokemon.name}"
                    data-id="dialog-image">

            </div>
        </section>
        
        <section>
            <nav class="nav-dialog">
                <button onclick="openMain()" class="nav-dialog-btn nav-btn-left" aria-label="pokemon main information">Main</button>
                <button onclick="openStats()" class="nav-dialog-btn" aria-label="pokemon stats">Stats</button>
                <button onclick="openEvolution()" class="nav-dialog-btn nav-btn-right" aria-label="pokemon evolution chain">Evo chain</button>
            </nav>

            <div class="pok-info" id="main">
                <table class="pok-info-wrapper">
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

            <div id="stats" class="d-none pok-info">
                <table>
                    <tr>
                        <th class="stats-wrapper">Hp</th>
                        <th class="stats-wrapper">
                            <div class="progress" role="progressbar" aria-label="Danger example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="border:solid #740303;">
                                <div class="progress-bar bg-danger" style="width: ${currentPokemon.stats[0].base_stat}%"></div>
                            </div>
                        </th>
                    </tr>
                    <tr>
                        <th class="stats-wrapper">Attack</th>
                        <th class="stats-wrapper">
                            <div class="progress" role="progressbar" aria-label="Danger example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="border:solid #740303;">
                                <div class="progress-bar bg-danger" style="width: ${currentPokemon.stats[1].base_stat}%"></div>
                            </div>
                        </th>
                    </tr>
                    <tr>
                        <th class="stats-wrapper">Defense</th>
                        <th class="stats-wrapper">
                            <div class="progress" role="progressbar" aria-label="Danger example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="border:solid #740303;">
                                <div class="progress-bar bg-danger" style="width: ${currentPokemon.stats[2].base_stat}%"></div>
                            </div>
                        </th>
                    </tr>
                    <tr>
                        <th class="stats-wrapper">Special-attack</th>
                        <th class="stats-wrapper">
                            <div class="progress" role="progressbar" aria-label="Danger example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="border:solid #740303;">
                                <div class="progress-bar bg-danger" style="width: ${currentPokemon.stats[3].base_stat}%"></div>
                            </div>
                        </th>
                    </tr>
                    <tr>
                        <th class="stats-wrapper">Special-defense</th>
                        <th class="stats-wrapper">
                            <div class="progress" role="progressbar" aria-label="Danger example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="border:solid #740303;">
                                <div class="progress-bar bg-danger" style="width: ${currentPokemon.stats[4].base_stat}%"></div>
                            </div>
                        </th>
                    </tr>
                    <tr>
                        <th class="stats-wrapper">Speed</th>
                        <th class="stats-wrapper">
                            <div class="progress" role="progressbar" aria-label="Danger example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="border:solid #740303;">
                                <div class="progress-bar bg-danger" style="width: ${currentPokemon.stats[5].base_stat}%"></div>
                            </div>
                        </th>
                    </tr>
                </table>
            </div>

            <div id="evolution" class="d-none pok-info">
                <div class="evolution-wrapper ${currentPokemon.evolutionPokemon.length >= 4 ? "evolution-scroll" : ""}">
                    ${currentPokemon.evolutionPokemon.map((evolution, index) => `
                        <div>
                            <img
                                class="evolution-img"
                                src="${evolution.sprites.other["official-artwork"].front_default}"
                                alt="${evolution.name}">
                            <p style="font-weight:500;">${evolution.name}</p>
                        </div>

                    ${index < currentPokemon.evolutionPokemon.length - 1
                        ? `<img class="double-arrow" src="./img/double-arrows.png" alt="chain" style="height: 24px;">`
                        : ""}
                    `).join("")}
                </div>
            </div>
        </section>

        <section class="dialog-footer">
            <button class="next-presvius-btn" onclick="changePokemon(${index}, -1)" data-id="prev-button" aria-label="open next pokemon">
                <img src="./img/left-right-btn.png" alt="previous">
            </button>

            <button class="next-presvius-btn" onclick="changePokemon(${index}, 1)" data-id="next-button" aria-label="open previus pokemon">
                <img src="./img/left-right-btn.png" alt="next" style="transform: scaleX(-1);">
            </button>
        </section>
    </div>`;
}