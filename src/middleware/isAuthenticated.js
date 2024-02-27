 

exports.isAuthenticated = (req, res, next) => {
 
  if (req.user?.data.user._id) {
    next();
  } else {
    if (req.decToken) {
      console.log("NEMAA")
      return res
        .status(401)
        .json({ expMessage: "Your session has expired, login again!" });

    }
    res.status(401).json({ unathorized: "unauthorized!" });
  }
};
