const router = require("express").Router();

const UserController = require("./controllers/userController");
const itemController = require("./controllers/itemController");

router.use("/users", UserController);
router.use("/items", itemController);

router.get("*", (req, res) => res.status(400).send("Bad Request!"));

module.exports = router;
