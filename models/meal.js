module.exports = function(sequelize, DataTypes) {
  var Meal = sequelize.define('Meal', {
    meal: {
      type: DataTypes.STRING,
      required: true,
      trim: true,
      len: [3, 255],
      allowNull: false
    }
  });

  Meal.associate = function(models) {
    Meal.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Meal;
};
