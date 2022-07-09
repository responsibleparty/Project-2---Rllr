const hidden = document.querySelector('#hiddendata');


const P = new Pokedex.Pokedex()
console.log(hidden.dataset.hidden)

const numbers = [1, 2, 3]
let htmlTemplate = ``;

// number.forEach(async element => {
//     const poke = await P.getPokemonByName(element)
//     console.log(poke)
//     htmlTemplate += `
//         <div class='card'>
//             <div class="card-title">
//                 <h4>${poke.name} sadfa</h4>
//             </div
//         </div>
//     `
// });

const dothis = async () => {
    for (const ide of numbers) {
        const poke = await P.getPokemonByName(ide)
        htmlTemplate += `
        <div class='card'>
            <div class='card-title'>
                <h5>${poke.name}</h5>
            </div>
        </div>
        `
    }

    // console.log(htmlTemplate)
    document.querySelector('#showcard').innerHTML = htmlTemplate

}
dothis();