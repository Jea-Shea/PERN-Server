module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    email: {
      type: DataTypes.string,
      allowNull: false,
      unique: true
    },
    passwordHash: {
      type: DataTypes.string,
      allowNull: false
    },
    groceryList: {
      type: DataTypes.string,
      allowNull: true
    },
  })
  return User;
}
