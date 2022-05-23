module.exports = (sequelize, DataTypes) => {
  const Shift = sequelize.define("shift", {
    start: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    end: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  return Shift;
};
