const Car = require("../mongoose/models/car");

exports.addCar = async (data) => {
  const car = await Car.create(data);

  return car;
};

exports.getAllCars = async (data) => {
  if (!data) {
    return await Car.find().lean();
  } else {
    return await Car.find(JSON.parse(data)).lean();
  }
};

exports.getMyCars = async (data) => {
  const car = await Car.find({ owner: data }).lean();

  return car;
};

exports.getCar = async (id) => {
  const car = await Car.findById(id).lean();

  return car;
};

exports.updateCarViews = async (id) => {
  const car = await Car.findById(id).lean();

  const newValue = car.views + 1;

  const updatedCar = await Car.findByIdAndUpdate(id, { views: newValue });

  return updatedCar;
};

exports.addBuyerToCar = async (id, buyerDetails) => {
  const car = await Car.findById(id).lean();

  const alreadyBought = [];

  for ([key, values] of Object.entries(car.buyers)) {
    alreadyBought.push(values._id);
  }

  if (!alreadyBought.includes(buyerDetails._id)) {
    car.buyers.push(buyerDetails);
    const updatedCar = await Car.findByIdAndUpdate(
      id,
      { buyers: car.buyers },
      { new: true }
    );

    return updatedCar;
  } else {
    throw new Error("user already bought the car!");
  }
};

exports.deleteCar = async (id) => {
  const car = await Car.findByIdAndDelete(id).lean();

  return car;
};

exports.editCar = async (id, data) => {
  const car = await Car.findByIdAndUpdate(id, data);
  return car;
};
