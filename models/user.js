module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      required: true,
      trim: true,
      len: [3, 255],
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      required: true,
      unique: true,
      trim: true,
      len: [3, 255],
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      required: true,
      trim: true,
      len: [10, 1024],
      allowNull: false
    }
  });

  User.associate = function(models) {
    User.hasMany(models.Meal, {
      onDelete: 'cascade'
    });
  };

  return User;
};
