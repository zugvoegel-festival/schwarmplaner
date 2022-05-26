module.exports = (sequelize, DataTypes) => {
  const job = sequelize.define('job', {
    slug: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return job;
};
