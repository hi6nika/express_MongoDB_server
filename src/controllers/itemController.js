const itemController = require("express").Router();

const { isAuthenticated } = require("../middleware/isAuthenticated");
const itemServices = require("../services/itemServices");
const toErrText = require("../util/toErrText");

itemController.post("/catalog", isAuthenticated, async (req, res) => {
  const data = req.body;
  try {
    const itemData = await itemServices.addCar({ ...data });
    res.status(201).json(itemData);
  } catch (error) {
    res.status(400).json(toErrText(error));
  }
});

itemController.get("/getMyItems/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const itemData = await itemServices.getMyCars(id);
    res.status(200).json(itemData);
  } catch (error) {
    res.status(400).json(toErrText(error));
  }
});

itemController.get("/catalog", async (req, res) => {
  try {
    const itemData = await itemServices.getAllCars();
    res.status(200).json(itemData);
  } catch (error) {
    res.status(400).json(toErrText(error));
  }
});

itemController.get("/catalog/:params", async (req, res) => {
  const { params } = req.params;

  try {
    const itemData = await itemServices.getAllCars(params);
    res.status(200).json(itemData);
  } catch (error) {
    res.status(400).json(toErrText(error));
  }
});

itemController.get("/details/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const itemData = await itemServices.getCar(id);

    res.status(230).json(itemData);
  } catch (error) {
    res.status(400).json(toErrText(error));
  }
});

itemController.put("/details/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const itemData = await itemServices.updateCarViews(id);

    res.status(200).json(itemData);
  } catch (error) {
    res.status(400).json(toErrText(error));
  }
});

itemController.put("/buy/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;

  const buyerData = req.body;

  try {
    const itemData = await itemServices.addBuyerToCar(id, buyerData);

    res.status(200).json(itemData);
  } catch (error) {
    res.status(405).json(toErrText(error));
  }
});

itemController.delete("/delete/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;

  try {
    const itemData = await itemServices.deleteCar(id);

    res.status(204).json(itemData);
  } catch (error) {
    res.status(400).json(toErrText(error));
  }
});

itemController.get("/edit/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const itemData = await itemServices.getCar(id);

    res.status(200).json(itemData);
  } catch (error) {
    res.status(400).json(toErrText(error));
  }
});

itemController.put("/edit/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;

  const newData = req.body;

  try {
    const itemData = await itemServices.editCar(id, newData);

    res.status(200).json(itemData);
  } catch (error) {
    res.status(400).json(toErrText(error));
  }
});

module.exports = itemController;
