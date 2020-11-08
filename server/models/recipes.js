const sequelize = require("../db");

module.exports = (sequelize, DataTypes) => {
    const Recipe = sequelize.define('recipe', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ingredients: {
            type: DataTypes.STRING,
            allowNull: false,
        },        
        instructions: {
            type: DataTypes.STRING,
        },
        hasNotes: {
            type: DataTypes.BOOLEAN,
        },
        notes: {
            type: DataTypes.STRING,
        },
    })
    return Recipe;
}
