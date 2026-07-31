function pokTemplate(currentPokemon) {
    console.log(currentPokemon);
    
    return `<div>${currentPokemon.name}</div>
            <div>${currentPokemon.id}</div>`;
}