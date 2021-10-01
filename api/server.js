const express = require("express");
const helmet = require("helmet");
const server = express();

const actionsRouter = require("./actions/actions-router");
const projectsRouter = require("./projects/projects-router");

server.use(express.json());
server.use(helmet());
server.use("/api/actions", logger, actionsRouter);
server.use("/api/projects", logger, projectsRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Welcome to spring challenge Unit 4</h2>`);
});

server.use("*", (req, res, next) => {
  next({ status: 404, message: `${req.method} ${req.originalUrl} not found` });
});

server.use(errorHandling);

module.exports = server;

function errorHandling(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
  });
}

function logger(req, res, next) {
  console.log(
    `${new Date().toLocaleTimeString()} it is a ${req.method} request to ${
      req.originalUrl
    }`
  );
  next();
}
