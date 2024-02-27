const CarController = require("express").Router();

const { isAuthenticated } = require("../middleware/isAuthenticated");
const carServices = require("../services/carServices");
const toErrText = require("../util/toErrText");

CarController.post("/catalog", isAuthenticated, async (req, res) => {
  const data = req.body;
  try {
    const carData = await carServices.addCar({ ...data });
    res.status(201).json(carData);
  } catch (error) {
    res.status(400).json(toErrText(error));
  }
});

CarController.get("/getMyCars/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const carData = await carServices.getMyCars(id);
    res.status(200).json(carData);
  } catch (error) {
    res.status(400).json(toErrText(error));
  }
});

CarController.get("/catalog", async (req, res) => {
  try {
    const carData = await carServices.getAllCars();
    res.status(200).json(carData);
  } catch (error) {
    res.status(400).json(toErrText(error));
  }
});

CarController.get("/catalog/:params", async (req, res) => {
  const { params } = req.params;

  try {
    const carData = await carServices.getAllCars(params);
    res.status(200).json(carData);
  } catch (error) {
    res.status(400).json(toErrText(error));
  }
});

CarController.get("/details/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const carData = await carServices.getCar(id);

    res.status(230).json(carData);
  } catch (error) {
    res.status(400).json(toErrText(error));
  }
});

CarController.put("/details/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const carData = await carServices.updateCarViews(id);

    res.status(200).json(carData);
  } catch (error) {
    res.status(400).json(toErrText(error));
  }
});

CarController.put("/buy/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;

  const buyerData = req.body;

  try {
    const carData = await carServices.addBuyerToCar(id, buyerData);

    res.status(200).json(carData);
  } catch (error) {
    res.status(405).json(toErrText(error));
  }
});

CarController.delete("/delete/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;

  try {
    const carData = await carServices.deleteCar(id);

    res.status(204).json(carData);
  } catch (error) {
    res.status(400).json(toErrText(error));
  }
});

CarController.get("/edit/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const carData = await carServices.getCar(id);

    res.status(200).json(carData);
  } catch (error) {
    res.status(400).json(toErrText(error));
  }
});

CarController.put("/edit/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;

  const newData = req.body;

  try {
    const carData = await carServices.editCar(id, newData);

    res.status(200).json(carData);
  } catch (error) {
    res.status(400).json(toErrText(error));
  }
});

module.exports = CarController;
