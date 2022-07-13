const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/connection');

class Following extends Model {}

Following.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        current_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id",
                unique:false
            },
        },
        followed_id:{
            type: DataTypes.INTEGER,
            references: {
                model: "user",
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
        modelName: "following",
    }
);

module.exports = Following