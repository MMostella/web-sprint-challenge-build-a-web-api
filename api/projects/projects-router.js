const express = require("express");
const Projects = require("./projects-model");
const {
  validateProject,
  validateFullProject,
} = require("./projects-middleware");

const router = express.Router();

router.get("/", (req, res, next) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch(next);
});

router.get("/:id", (req, res, next) => {
  Projects.get(req.params.id)
    .then((projects) => {
      if (projects) {
        res.status(200).json(projects);
      } else {
        res.status(404).json({
          message: `There are no projects with id of ${req.params.id}`,
        });
      }
    })
    .catch(next);
});

router.post("/", validateProject, (req, res, next) => {
  Projects.insert(req.body)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch(next);
});

router.put("/:id", (req, res, next) => {
  Projects.update(req.params.id, req.body)
    .then((project) => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(400).json({
          message: `There is no projects with the id of ${req.params.id}`,
        });
      }
    })
    .catch(next);
});

router.delete("/:id", (req, res, next) => {
  Projects.remove(req.params.id)
    .then((project) => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({
          message: `There was no project with the id of ${req.params.id}`,
        });
      }
    })
    .catch(next);
});

router.get("/:id/actions", (req, res, next) => {
  Projects.getProjectActions(req.params.id)
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch(next);
});

module.exports = router;
