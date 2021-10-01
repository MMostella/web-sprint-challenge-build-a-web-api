const yup = require("yup");

const Projects = require("./projects-model");

const projectSchema = yup.object().shape({
  name: yup.string().required("Name is required"),

  description: yup.string().required("Description is required"),

  completed: yup.boolean({ is: false }),
});

async function validateProject(req, res, next) {
  try {
    const projectValidated = await projectSchema.validate(req.body);
    req.body = projectValidated;
    next();
  } catch (err) {
    next({ status: 400, message: `Missing required text fields` });
  }
}

const fullProjectSchema = yup.object().shape({
  name: yup.string().required("Name is required"),

  description: yup.string().required("Description is required"),

  completed: yup.boolean().required("Completed is required"),
});

async function validateFullProject(req, res, next) {
  try {
    const projectValidated = await fullProjectSchema.validate(req.body);
    req.body = projectValidated;
    next();
  } catch (err) {
    next({ status: 400, message: `Missing required text fields` });
  }
}

module.exports = {
  validateProject,
  validateFullProject,
};
