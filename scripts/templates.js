function dialogTriggerTemplate(currentPokemon) {
    console.log(currentPokemon);
    
    return `<div>${currentPokemon.name}</div>
            <div>${currentPokemon.id}</div>`;
}