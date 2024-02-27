const mongoose = require("mongoose");

const { CONNECTION_STRING, DATA_BASE_NAME } = require("../constants");
async function connectDB() {
  await mongoose.connect(`${CONNECTION_STRING}/${DATA_BASE_NAME}`);

  console.log(`Connected to ${DATA_BASE_NAME} database!`);
}

module.exports = connectDB;
