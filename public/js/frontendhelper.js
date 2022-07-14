const capitalize = (str) => {
    return str
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("");
};

const one_theme = (type) => {
    const typeColor = {
        bug: "#26de81",
        dragon: "#ffeaa7",
        electric: "#fed330",
        fairy: "#FF0069",
        fighting: "#30336b",
        fire: "#f0932b",
        flying: "#81ecec",
        grass: "#00b894",
        ground: "#EFB549",
        ghost: "#a55eea",
        ice: "#74b9ff",
        normal: "#95afc0",
        poison: "#6c5ce7",
        psychic: "#a29bfe",
        rock: "#2d3436",
        water: "#0190FF",
        steel: "#7a7f80",
        dark: "#383838",
    };
    return typeColor[type];
};

const buildMyCard = (poke, index) => {
    let templateHtml = `
    
    <div class="poke-card"
    style="background: radial-gradient(circle at 50% 0%, ${one_theme(
        poke.types[0]
    )} 36%, rgb(255, 255, 255) 36%);">
    <p class='handle'><i class="fa-2x fa-solid fa-grip"></i></p>
    <p class="hp">
        <span>ID</span>
        ${poke.id}
        
    </p>
    <a href='/pokedetail/${poke.api_id}' target='_blank'>
    <img class='animate__animated animate__infinite animate__slower animate__pulse' src="/images/pokemons/${
        poke.api_id
    }.svg">
    </a>
    
    <h2 class="poke-name">${capitalize(poke.name)}</h2>
    <div class="types">
       
        ${poke.types.map(
            (type) =>
                `<span style="background-color:${one_theme(
                    type
                )};">${capitalize(type)}</span>`
        )}
    </div>
    <div class="stats">
        <div>
            <h3>${poke.stat_hp}<i class="fa-solid fa-heart"></i></h3>
            <p>HP</p>
        </div>
        <div>
            <h3>${
                poke.stat_att
            } <i class="fa-solid fa-location-crosshairs"></i></h3>
            <p>ATT</p>
        </div>
        <div>
            <h3>${poke.stat_def} <i class="fa-solid fa-shield"></i></h3>
            <p>DEF</p>
        </div>

    </div>
    <div class="stats">
        <div>
            <h3>${poke.stat_speed} <i class="fa-solid fa-wind"></i></h3>
            <p>SPD</p>
        </div>
        <div>
            <h3>${
                poke.stat_special_att
            } <i class="fa-solid fa-skull-crossbones"></i></h3>
            <p>Sp. ATT</p>
        </div>
        <div>
            <h3>${
                poke.stat_special_def
            } <i class="fa-solid fa-shield-virus"></i></h3>
            <p>Sp. DEF</p>
        </div>
    </div>
    <div class="abilities">
        <p> <span class="h6">Abilities: </span>
            ${poke.abilities.map((abi) => ` <span class='pill'>${abi}</span>`)}
        </p>

    </div>

</div>
    
    
    
    `;

    return templateHtml;
};


const buildSimpleCard = (poke, index) => {
    let templateHtml = `
    
    <div class="poke-card"
    style="background: radial-gradient(circle at 50% 0%, ${one_theme(
        poke.types[0]
    )} 36%, rgb(255, 255, 255) 36%);">
    <p class='handle'><i class="fa-2x fa-solid fa-grip"></i></p>
    <p class="hp">
        <span>ID</span>
        ${poke.id}
        
    </p>
    <a href='/pokedetail/${poke.api_id}' target='_blank'>
    <img class='animate__animated animate__infinite animate__slower animate__pulse' src="/images/pokemons/${
        poke.api_id
    }.svg">
    </a>
    
    <h2 class="poke-name">${capitalize(poke.name)}</h2>
    <div class="types">
       
        ${poke.types.map(
            (type) =>
                `<span style="background-color:${one_theme(
                    type
                )};">${capitalize(type)}</span>`
        )}
    </div>

</div>
    
    
    
    `;

    return templateHtml;
};
