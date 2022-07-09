const {
    Post,
    User
} = require("../models");
const Comment = require("../models/Comment");
const Pokedex = require("../models/Pokedex");
const withAuth = require("../utils/auth");
const router = require("express").Router();

const {
    Op
} = require('sequelize')


router.get("/", async (req, res) => {
    try {
        // JOIN TABLES
        const postData = await Post.findAll({
            include: [{
                    model: User,
                    attributes: ["username"],
                },
                {
                    model: Comment,
                    include: {
                        model: User,
                        attributes: ["username"]
                    },
                    attributes: ["description", "date_created", "id"],
                },
            ],
            order: [
                ["date_created", "DESC"]
            ],
        });
        const posts = postData.map((post) => post.get({
            plain: true
        }));

        // render posts as well as current logged in user
        res.render("homepage", {
            posts,
            logged_in: req.session.logged_in,
            user_id: req.session.user_id,
            currentUser: req.session.currentUser,
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

// if the user logged in, go to homepage
router.get("/login", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/");
    } else {
        res.render("login");
    }
});

// Handle dashboard view
router.get("/dashboard", withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            include: [{
                model: Post
            }],
            attributes: {
                exclude: ["password"]
            },
            order: [
                [{
                    model: Post
                }, "date_created", "DESC"]
            ],
        });

        const user = userData.get({
            plain: true
        });
        res.render("dashboard", {
            ...user,
            logged_in: req.session.logged_in,
            currentUser: req.session.currentUser,
        });
    } catch (error) {
        res.status(400).json(error);
    }
});

router.get("/pokedex", async (req, res) => {
    try {

        const pokeData = await Pokedex.findAll();
        const pokedex = pokeData.map((p) => {
            const pokemon = p.get({
                plain: true
            })
            // const moves_arr = JSON.parse(pokemon.moves).map((move)=>{
            //     const oneRow = move.split('**')
            //     return {name:oneRow[0],lv:oneRow[1],from:oneRow[2]}
            // })
            const newPokemon = {
                ...pokemon,
                abilities: JSON.parse(pokemon.abilities),
                types: JSON.parse(pokemon.types),
                // moves:moves_arr
            }
            return newPokemon
        })

        // res.status(200).json(pokedex)
        res.render('pokedex', {
            pokedex
        })
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/pokeown', async (req, res) => {
    try {
        const own = [2, 5, 6];
        const pokeData = await Pokedex.findAll({
            where: {
                api_id: {
                    [Op.in]: own
                }
            }
        });
        const pokedex = pokeData.map((p) => {
            const pokemon = p.get({
                plain: true
            })
            // const moves_arr = JSON.parse(pokemon.moves).map((move)=>{
            //     const oneRow = move.split('**')
            //     return {name:oneRow[0],lv:oneRow[1],from:oneRow[2]}
            // })
            const newPokemon = {
                ...pokemon,
                abilities: JSON.parse(pokemon.abilities),
                types: JSON.parse(pokemon.types),
                // moves:moves_arr
            }
            return newPokemon
        })

        // res.status(200).json(pokedex)
        res.render('pokeown', {
            pokedex
        })
    } catch (error) {
        res.status(500), json(error)
    }
})

router.get('/pokedetail/:query', async (req, res) => {
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
        // res.status(200).json(newPokemon)

        res.render('pokedetail', newPokemon)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;