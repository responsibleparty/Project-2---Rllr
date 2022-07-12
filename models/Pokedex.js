const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Pokedex extends Model {}

Pokedex.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        order: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        api_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        is_default: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        height: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        past_types: {
            type: DataTypes.STRING,
        },
        base_experience: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        weight: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        types: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        stat_hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        stat_def: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        stat_special_att: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        stat_special_def: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        stat_att: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        stat_speed: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        abilities: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        species:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        moves:{
            type: DataTypes.TEXT,
            allowNull: false,
            length:9999
            
        },
        moves_url:{
            type: DataTypes.TEXT,
            allowNull: false,
            length:9999
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "pokedex",
    }
);

module.exports = Pokedex;
