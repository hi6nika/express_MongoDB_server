const { SECRET, authTokenName } = require("../constants");
const jwt = require("../util/jwtPromisify");

exports.auth = async (req, res, next) => {
  const token = req.header(authTokenName);

  if (token) {
    try {
      const decToken = await jwt.verify(token, SECRET);
      req.user = decToken;
    } catch (error) {
      req.decToken = token;
    }
  }
  next();
};
