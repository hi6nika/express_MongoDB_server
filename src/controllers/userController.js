const userController = require("express").Router();
const { isAuthenticated } = require("../middleware/isAuthenticated");
const userServices = require("../services/userServices");
const toErrText = require("../util/toErrText");

userController.post("/register", async (req, res) => {
  const data = req.body;

  try {
    const userData = await userServices.register({ ...data });

    res.status(201).json(userData);
  } catch (error) {
    res.status(400).send(toErrText(error));
  }
});

userController.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await userServices.login(email, password);
    res.status(200).json(userData);
  } catch (error) {
    res.status(403).send(toErrText(error));
  }
});

userController.post("/logout", isAuthenticated, async (req, res) => {
  
  try {
    res.status(202).json({auth : false})
  } catch (error) {
    res.status(403).send(toErrText(error));
  }
});

module.exports = userController;
