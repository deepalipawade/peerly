module.exports = (sequelize, Sequelize) => {
  const Recognitions = sequelize.define(
    "recognitions",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      core_value_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "core_values",
          key: "id",
        },
      },
      text: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      given_for: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      given_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
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
    }
  );
  Recognitions.associate = (models) => {
    Recognitions.belongsTo(models.users, {
      foreignKey: "given_for",
      as: "given_for_user",
    });
    Recognitions.belongsTo(models.core_values, { foreignKey: "core_value_id" });
    Recognitions.belongsTo(models.users, {
      foreignKey: "given_by",
      as: "given_by_user",
    });
  };
  return Recognitions;
};
