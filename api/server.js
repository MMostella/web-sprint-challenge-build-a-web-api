const express = require("express");

const server = express();

const actionsRouter = require("./actions/actions-router");
const projectsRouter = require("./projects/projects-router");

server.use(express.json());
server.use("/api/actions", logger, actionsRouter);
server.use("api/projects", logger, projectsRouter);

// Configure your server here

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
