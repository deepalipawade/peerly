var cron = require("node-cron");

const db = require("../models/sequelize");
cron.schedule(process.env.TIME_RESET_HI5_QUOTA, async () => {
  db.sequelize.query("select resetHi5Quota();");
});
