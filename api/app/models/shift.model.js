module.exports = (sequelize, DataTypes) => {
  const Shift = sequelize.define("shift", {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    start: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    end: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amountHelper: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  return Shift;
};
