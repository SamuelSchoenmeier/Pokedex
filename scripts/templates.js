function dialogTriggerTemplate(currentPokemon) {
    console.log(currentPokemon);
    
    return `<div>${currentPokemon.name}</div>
            <div>${currentPokemon.id}</div>
            <img src="${currentPokemon.sprites.front_default}" alt>`;
}