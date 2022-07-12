const P = new Pokedex.Pokedex();
(async () => {
    const pokeGenerator = []
    const golduck = await P.getPokemonByName(1);
    console.log(golduck);
    for (let i = 1; i<152;i++){
        const data = await P.getPokemonByName(i);
        const stats = {
            name: data.name,
            order: data.order,
            api_id:data.id,
            is_default: data.is_default,
            height: data.height,
            past_types: JSON.stringify(data.past_types),
            base_experience: data.base_experience,
            weight:data.weight,
            types: JSON.stringify(data.types.map(type=>type.type.name)),
            stat_hp: data.stats[0].base_stat,
            stat_att: data.stats[1].base_stat,
            stat_def: data.stats[2].base_stat,
            stat_special_att: data.stats[3].base_stat,
            stat_special_def: data.stats[4].base_stat,
            stat_speed: data.stats[5].base_stat,
            abilities:JSON.stringify(data.abilities.map(abi=>abi.ability.name)),
            species: data.species.name,
            moves: JSON.stringify(data.moves.map(move=>move.move.name + "**"+move.version_group_details[0].level_learned_at+"**"+move.version_group_details[0].move_learn_method.name)),            
            moves_url: JSON.stringify(data.moves.map(move=>move.move.url))
          }
        console.log(data)
        pokeGenerator.push(stats)
    }

    console.log(pokeGenerator)
    document.querySelector('#display').innerHTML = JSON.stringify(pokeGenerator) 
})();

{/* <div class="card">
  <img src="./images/pokemons/{{this.api_id}}.svg" class="img-fluid img-thumbnail" alt="{{this.name}}">
  <div class="card-body">
    <h4 class="card-title">{{this.name}}</h4>
    <h6 class="card-subtitle mb-2 text-muted ">EXP: {{this.order}}</h6>
    <p class="card-text"></p>
    THEME Color {{theme_color this.types}}
  </div>
</div> */}
