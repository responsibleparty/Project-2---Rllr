const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/connection');

class Ownership extends Model {}

Ownership.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id",
                unique:false
            },
        },
        pokemon_id:{
            type: DataTypes.INTEGER,
            references: {
                model: "pokemon",
                key: "id",
                unique:false
            },
        }

    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "ownership",
    }
);

module.exports = Ownership