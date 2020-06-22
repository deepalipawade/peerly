module.exports = (sequelize, Sequelize) => {
  const Recognition_hi5 = sequelize.define(
    "recognition_hi5",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      recognition_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      given_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      given_at: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
    },
    {
      timestamp: false,
      createdAt: false,
      updatedAt: false,
      freezeTableName: true,
    }
  );

  Recognition_hi5.associate = (models) => {
    Recognition_hi5.belongsTo(models.recognitions, {
      foreignKey: "recognition_id",
      as: "hi5Count",
    });
  };
  return Recognition_hi5;
};
