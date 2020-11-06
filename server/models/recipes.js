const sequelize = require("../db");

module.exports = (sequelize, DataTypes) => {
    const Recipe = sequalize.define('user', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        ingredients: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },        
        instructions: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        notes: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        notes: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            unique: true
        },
    })
    return Recipe;
}