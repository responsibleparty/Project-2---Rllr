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

module.exports = router;