const express = require("express");
const bodyParser = require("body-parser");

const utility = require("../utils/utility");
const /*eslint-disable no-unused-vars*/ BadgesControllerV1 = require("../controllers/v1/badgesController");
const jwtValidate = require("../jwtTokenValidation/jwtValidation");
const badgesRouter = express.Router();
badgesRouter.use(bodyParser.urlencoded({ extended: true }));

async function authorizedRole(req, res, next) {
  const authHeader = req.headers["authorization"];
  const tokenData = await jwtValidate.getData(authHeader);
  if (tokenData.roleId == 2) {
    next();
  } else {
    res.status(401).send({
      error: {
        message: "unauthorised user",
      },
    });
  }
}

//for create badges
badgesRouter.post(
  "/organisations/:organisation_id/badges",
  authorizedRole,
  async (req, res) => {
    let controller = await utility.getVersionedController(
      req.headers,
      "BadgesController"
    );
    /*eslint-disable no-eval*/ eval(controller).create(req, res);
  }
);
//for get all badges
badgesRouter.get(
  "/organisations/:organisation_id/badges",
  authorizedRole,
  async (req, res) => {
    let controller = await utility.getVersionedController(
      req.headers,
      "BadgesController"
    );
    eval(controller).findAll(req, res);
  }
);
//for get badges by id
badgesRouter.get(
  "/organisations/:organisation_id/badges/:id",
  authorizedRole,
  async (req, res) => {
    let controller = await utility.getVersionedController(
      req.headers,
      "BadgesController"
    );
    eval(controller).findOne(req, res);
  }
);
//for update badges
badgesRouter.put(
  "/organisations/:organisation_id/badges/:id",
  authorizedRole,
  async (req, res) => {
    let controller = await utility.getVersionedController(
      req.headers,
      "BadgesController"
    );
    eval(controller).update(req, res);
  }
);

module.exports = badgesRouter;
