const yup = require("yup");

module.exports.insertSchema = () => {
  return yup.object().shape({
    core_value_id: yup
      .number({ core_value_id: "should be number" })
      .required({ core_value_id: "required" })
      .typeError({ core_value_id: "should be number" }),
    text: yup.string({ text: "should be text" }).required({ text: "required" }),
    given_for: yup
      .number()
      .required({ given_for: "required" })
      .typeError({ given_for: "should be number" }),
    given_by: yup.number().typeError({ given_by: "should be number" }),
    given_at: yup.number().typeError({ given_at: "should be number" }),
  });
};

module.exports.getByIdSchema = () => {
  return yup.object().shape({
    id: yup
      .number()
      .required({ id: "required" })
      .typeError({ id: "should be number " }),
  });
};

module.exports.getFilterSchema = () => {
  return yup.object().shape({
    core_value_id: yup
      .number()
      .typeError({ core_value_id: "should be number" }),
    given_for: yup.number().typeError({ given_for: "should be number" }),
    given_by: yup.number().typeError({ given_by: "should be number" }),
    limit: yup
      .number()
      .nullable()
      .typeError({ given_limit: "should be number" }),
    offset: yup
      .number()
      .nullable()
      .typeError({ given_offset: "should be number" }),
  });
};
