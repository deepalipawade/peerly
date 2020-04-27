module.exports = (sequelize, Sequelize) => {
  const User_blacklisted_tokens = sequelize.define(
    "user_blacklisted_tokens",
    {
      id: {
        type: Sequelize.INTEGER,
        notNull: true,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        notNull: true,
      },
      token: {
        type: Sequelize.TEXT,
        notNull: true,
      },
      expiry_date: {
        type: "TIMESTAMP",
        notNull: true,
      },
    },
    {
      timestamp: false,
      createdAt: false,
      updatedAt: false,
    }
  );
  return User_blacklisted_tokens;
};
