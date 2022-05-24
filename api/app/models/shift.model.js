module.exports = (sequelize, DataTypes) => {
  const Shift = sequelize.define('shift', {
    start: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end: {
      type: DataTypes.DATE,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Shift;
};
