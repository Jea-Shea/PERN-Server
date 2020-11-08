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
            allowNull: false,
        },
        notes: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        
    })
    return Recipe;
}
