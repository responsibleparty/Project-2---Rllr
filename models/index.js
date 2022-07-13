const Post = require("./Post");
const User = require("./User");
const Comment = require('./Comment');
const Following = require('./Following');
const Pokemon = require("./Pokemon");
const Ownership = require("./Ownership");
const Pokedex = require("./Pokedex");

User.hasMany(Post,{
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.belongsTo(User,{
    foreignKey:'user_id'
})
User.hasMany(Comment,{
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})
Comment.belongsTo(User,{
    foreignKey:'user_id'
})

Post.hasMany(Comment,{
    foreignKey:'post_id',
    onDelete:'CASCADE'
})

Comment.belongsTo(Post,{
    foreignKey:'post_id',
})

User.belongsToMany(User,{
    through: Following,
    foreignKey:'current_id',
    otherKey:'followed_id',
    as: 'follow'
})

User.belongsToMany(User,
    {
        through: Following,
        foreignKey:'followed_id',
        otherKey:'current_id',
        as: 'followed'
    })

User.belongsToMany(Pokedex,{
    through:Ownership,
    foreignKey: 'user_id',
    otherKey:'pokemon_id',
    as: 'collection'
})

// Pokemon.belongsToMany(User,{
//     through:Ownership,
//     foreignKey: 'pokemon_id',
//     otherKey:'user_id',
//     as: 'own'
// })


module.exports = {User,Post,Comment,Following,Pokemon,Ownership}