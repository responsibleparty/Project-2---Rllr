const Pokedex = require('../../models/Pokedex');
const withAuth = require('../../utils/auth')
const router = require('express').Router();
const {
    Op
} = require("sequelize");
const {
    sequelize
} = require('../../models/Pokedex');
// GET POST via id
router.get('/:query', async (req, res) => {
    try {
        const pokedex = await Pokedex.findOne({
            where: {
                [Op.or]: [{
                        name: req.params.query
                    },
                    {
                        id: req.params.query
                    }
                ]
            }
        })
        const pokemon = pokedex.get({
            plain: true
        })
        const moves_arr = JSON.parse(pokemon.moves).map((move) => {
            const oneRow = move.split('**')
            return {
                name: oneRow[0],
                lv: oneRow[1],
                from: oneRow[2]
            }
        })
        const newPokemon = {
            ...pokemon,
            moves_arr,
            abilities: JSON.parse(pokemon.abilities),
            types: JSON.parse(pokemon.types),
            moves: moves_arr
        }


        if (!newPokemon) {
            res.status(404).json('No pokemon associate with this id')
        }
        res.status(200).json(newPokemon);
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/', async (req,res)=>{
    try {
        const pokeData = await Pokedex.findAll();
        const pokedex = pokeData.map((p) => {
            const pokemon = p.get({
                plain: true
            })
         
            const newPokemon = {
                ...pokemon,
                abilities: JSON.parse(pokemon.abilities),
                types: JSON.parse(pokemon.types),
                
            }
            return newPokemon
        })

        res.status(200).json(pokedex)
        // res.render('pokesort', {
        //     pokedex,
        //     logged_in:req.session.logged_in
        // })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;