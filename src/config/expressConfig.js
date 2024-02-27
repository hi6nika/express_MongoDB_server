const express = require("express");

const { PORT } = require("../constants");
const router = require("../router");
const headersMiddle = require("../middleware/headersMiddle");
const { auth } = require("../middleware/authMiddleware");

const startServer = () => {
  const app = express();
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(headersMiddle());
  app.use(auth);
  app.use(router);

  app.listen(PORT, () => console.log("Server is listening on port " + PORT));
};

module.exports = startServer;
