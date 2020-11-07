module.exports = (sequelize, DataTypes) => {
    const Recipe = sequelize.define('recipe', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        ingredients: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },        
        instructions: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        notes: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        favorite: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            unique: false
        },
    })
    return Recipe;
}