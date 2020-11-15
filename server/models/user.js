module.exports = (sequelize, DataTypes) => {
  return sequelize.define("user", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    groceryList: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    favorites: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
  });
};
