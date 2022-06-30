const {
    Model,
    DataTypes
} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Team extends Model {}

Team.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    1: {
        type: DataType.STRING,
        allowNull: true
    },
    2: {
        type: DataType.STRING,
        allowNull: true
    },
    3: {
        type: DataType.STRING,
        allowNull: true
    },
    4: {
        type: DataType.STRING,
        allowNull: true
    },
    5: {
        type: DataType.STRING,
        allowNull: true
    },
    6: {
        type: DataType.STRING,
        allowNull: true
    },
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
});

module.exports = Team;