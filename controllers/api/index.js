const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commenRoutes = require('./commentRoutes')
const pokemonRoutes = require('./pokemonRoutes')
// API routes
router.use('/users', userRoutes);
router.use('/posts', postRoutes)
router.use('/comments', commenRoutes)
router.use('/pokemons', pokemonRoutes)
module.exports = router;