module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define("location", {
    slug: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });

  return Location;
};
