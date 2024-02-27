const expressStart = require("./config/expressConfig");
const dbConnect = require("./config/dbConnect");

dbConnect();

expressStart();
