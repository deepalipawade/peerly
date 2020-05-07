const jwt = require("jsonwebtoken");
const moment = require("moment");

const db = require("../../models/sequelize");
const Users = db.users;
const Organizations = db.organizations;
module.exports.login = async (req, res) => {
  let profile = req.user;
  let email = profile.emails[0].value;
  let firstName = profile.name.givenName;
  let lastName = profile.name.familyName;
  let displayName = profile.displayName;
  let userId;
  let roleId;
  let orgName;
  let orgId;
  let expTime;
  let result = await getUser(email);
  if (result == "error") {
    res.status(500).send({
      error: {
        message: "internal server error",
      },
    });
  } else if (result[1].rowCount) {
    userId = result[0][0].id;
    roleId = result[0][0].roleid;
    orgName = result[0][0].name;
    orgId = result[0][0].orgid;
    expTime = {
      expiresIn: process.env.JWT_EXPIRE_TIME, //eslint-disable-line  no-undef
    };
    const token = jwt.sign(
      {
        iss: "node.peerly.com",
        sub: userId,
        aud: "peerly.com",
        nbf: moment.utc().unix(),
        "https://peerly.com": {
          roleId: roleId,
          orgId: orgId,
          orgName: orgName,
        },
      },
      process.env.JWT_SECRET_KEY, //eslint-disable-line  no-undef
      expTime,
      {
        expiresIn: process.env.JWT_EXPIRE_TIME, //eslint-disable-line  no-undef
      }
    );
    res.send({
      data: {
        token: token,
      },
    });
  } else {
    let domainName = profile.emails[0].value.split("@").pop();
    let domainResult = await getOrganization(domainName);
    if (domainResult == "error") {
      res.status(500).send({
        error: {
          message: "internal server error",
        },
      });
    } else if (domainResult) {
      let orgId = domainResult.id;
      let checkerror = await insertData(
        orgId,
        firstName,
        lastName,
        email,
        displayName
      );
      if (checkerror == "error") {
        res.status(500).send({
          error: {
            message: "internal server error",
          },
        });
      } else {
        let getUserResult = await getUser(email);
        if (getUserResult[1].rowCount) {
          userId = getUserResult[0][0].id;
          roleId = getUserResult[0][0].roleid;
          orgName = getUserResult[0][0].name;
          orgId = getUserResult[0][0].orgid;
          expTime = {
            expiresIn: process.env.JWT_EXPIRE_TIME, //eslint-disable-line  no-undef
          };
          const token = jwt.sign(
            {
              iss: "node.peerly.com",
              sub: userId,
              aud: "peerly.com",
              nbf: moment.utc().unix(),
              "https://peerly.com": {
                roleId: roleId,
                orgId: orgId,
                orgName: orgName,
              },
            },
            process.env.JWT_SECRET_KEY, //eslint-disable-line  no-undef
            expTime
          );
          res.send({
            data: {
              token: token,
            },
          });
        } else {
          res.status(401).send({
            error: {
              message: "unauthorized user",
            },
          });
        }
      }
    } else {
      res.status(401).send({
        error: {
          message: "unauthorized user",
        },
      });
    }
  }
};

const getUser = async (email) => {
  let result;
  await db.sequelize
    .query(
      "select roles.id as roleId,organizations.id as orgId,users.id,organizations.name from users,roles,organizations where users.email = '" +
        email +
        "'"
    )
    .then(function (users) {
      result = users;
    })
    .catch(() => {
      result = "error";
    });
  return result;
};

const getOrganization = async (domainName) => {
  let domainResult;
  await Organizations.findOne({ where: { domain_name: domainName } })
    .then(function (organizationData) {
      domainResult = organizationData;
    })
    .catch(() => {
      domainResult = "error";
    });
  return domainResult;
};

const insertData = async (orgId, firstName, lastName, email, displayName) => {
  let errorCheck;
  const user = {
    org_id: orgId,
    first_name: firstName,
    last_name: lastName,
    email: email,
    display_name: displayName,
    soft_delete: false,
    role_id: 2,
    hi5_quota_balance: 5,
  };
  await Users.create(user).catch(() => {
    errorCheck = "error";
  });
  return errorCheck;
};
