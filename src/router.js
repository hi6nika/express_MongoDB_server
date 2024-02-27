const router = require("express").Router();

const UserController = require("./controllers/userController");
const CarController = require("./controllers/carController");

router.use("/users", UserController);
router.use("/cars", CarController);

router.get("*", (req, res) => res.status(400).send("BAD REQ!"));

module.exports = router;
