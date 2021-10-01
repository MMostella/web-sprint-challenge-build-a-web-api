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

router.post("/", (req, res, next) => {
  Actions.insert(req.body)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      next({ status: 400 });
    });
});

router.put("/:id", (req, res, next) => {
  Actions.update(req.params.id, req.body)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      next({ status: 400 });
    });
});

router.delete("/:id", (req, res, next) => {
  Actions.remove(req.params.id)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch(next);
});

module.exports = router;
