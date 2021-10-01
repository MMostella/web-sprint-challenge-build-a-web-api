const express = require("express");
const Actions = require("./actions-model");
const { validateId, validateAction } = require("./actions-middlware");

const router = express.Router();

router.get("/", (req, res, next) => {
  Actions.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch(next);
});

router.get("/:id", (req, res, next) => {
  Actions.get(req.params.id)
    .then((actions) => {
      if (actions) {
        res.status(200).json(actions);
      } else {
        res.status(404).json({
          message: `There are no action with the ID of ${req.params.id}`,
        });
      }
    })
    .catch(next);
});

router.post("/", validateAction, (req, res, next) => {
  Actions.insert(req.body)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch(next);
});

router.put("/:id", (req, res, next) => {});

router.delete("/:id", (req, res, next) => {});

module.exports = router;
