module.exports = (sequelize, DataTypes) => {
  const ShiftUser = sequelize.define(
    'shift_user',
    {
      selfGranted: DataTypes.BOOLEAN
    },
    { timestamps: false }
  );

  return ShiftUser;
};
