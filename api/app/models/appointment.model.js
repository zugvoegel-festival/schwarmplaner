module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define("appointment", {
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
    timed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    isVirtual: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    repeatation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    attachedPersons: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modified: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Appointment;
};
