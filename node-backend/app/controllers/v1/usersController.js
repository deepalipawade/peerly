const qs = require(/*eslint-disable  node/no-extraneous-require*/ "qs");
const yup = require("yup");

const utility = require("../../utils/utility");
const db = require("../../models/sequelize");
const Users = db.users;
const jwtToken = require("../../jwtTokenValidation/jwtValidation");
module.exports.findUsersByOrg = async (req, res) => {
  const authHeader = req.headers["authorization"];
  let userData = await jwtToken.getData(authHeader);
  const schema = yup.object().shape({
    org_id: yup.number().typeError({ org_id: "should be a number" }),
    starts_with: yup.string().typeError({ starts_with: "should be a string" }),
    limit: yup.number().typeError({ limit: "should be a number" }),
    offset: yup.number().typeError({ offset: "should be a number" }),
  });
  let obj = qs.parse(req.query);
  let limitOffsetObj = await utility.getLimitAndOffset(obj);
  schema
    .validate(obj, { abortEarly: false })
    .then(async () => {
      if (obj.org_id) {
        let superAdminAuth = await utility.validateRole(
          userData.roleId,
          "SuperAdmin"
        );
        if (!superAdminAuth) {
          {
            res.status(403).send({
              error: {
                code: "access_denied",
                message: "Permission required",
              },
            });
          }
        } else {
          Users.findAll({
            where: { org_id: userData.orgId },
            attributes: [
              "id",
              "first_name",
              "last_name",
              "email",
              "display_name",
              "profile_image_url",
              "role_id",
              "hi5_quota_balance",
              "org_id",
              "soft_delete_by",
              "soft_delete_at",
            ],
            limit: limitOffsetObj.limit,
            offset: limitOffsetObj.offset,
          })
            .then((users) => {
              res.status(200).send({
                data: users,
              });
            })
            .catch(() => {
              res.status(500).send({
                error: {
                  message: "internal server error",
                },
              });
            });
        }
      } else {
        Users.findAll({
          where: { org_id: userData.orgId, role_id: 3 },
          attributes: [
            "id",
            "first_name",
            "last_name",
            "email",
            "display_name",
            "profile_image_url",
            "role_id",
            "hi5_quota_balance",
            "org_id",
            "soft_delete_by",
            "soft_delete_at",
          ],
          limit: limitOffsetObj.limit,
          offset: limitOffsetObj.offset,
        })
          .then((users) => {
            res.status(200).send({
              data: users,
            });
          })
          .catch(() => {
            res.status(500).send({
              error: {
                message: "internal server error",
              },
            });
          });
      }
    })
    .catch((err) => {
      res.status(400).send({
        error: utility.getFormattedErrorObj(
          "invalid query params",
          "invalid query params data",
          err.errors
        ),
      });
    });
};
