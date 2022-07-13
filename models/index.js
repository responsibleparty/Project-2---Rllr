const Post = require("./Post");
const User = require("./User");
const Comment = require('./Comment');
const Following = require('./Following')

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

module.exports = {User,Post,Comment}