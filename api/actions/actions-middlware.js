const yup = "yup";

const Actions = require("./actions-model");

async function validateId(req, res, next) {
  try {
    const Action = await Actions.getById(req.params.id);
    if (Action) {
      req.actions = Actions;
      next();
    } else {
      next({ status: 404, message: `user not found` });
    }
  } catch (err) {
    next(err);
  }
}

// const actionSchema = yup.object().shape({
//   project_id: yup.required("Project Id is required"),

//   description: yup.string(),

//   notes: yup.string().required("Notes are required"),
// });

async function validateAction(req, res, next) {
  try {
    const actionValidated = await actionSchema.validate(req.body);
    req.body = actionValidated;
    next();
  } catch (err) {
    next({ status: 404, message: `Missing required text fields` });
  }
}

module.exports = {
  validateId,
  validateAction,
};
