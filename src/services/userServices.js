const User = require("../mongoose/models/user");
const bcrypt = require("bcrypt");

const jwt = require("../util/jwtPromisify");

const { SECRET } = require("../constants");

exports.register = async (data) => {
 
  const user = await User.create(data);

  if (user) {
    const payload = {
      user,
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const token = await generateToken(payload);
    return {
      ...payload,
      token,
    };
  }
};

exports.login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid email or password!");

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) throw new Error("Invalid email or password!");

  if (user) {
    const payload = {
      user,
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const token = await generateToken(payload);
    return {
      ...payload,
      token,
    };
  }
};

async function generateToken(data) {
  return await jwt.sign({ data }, SECRET, { expiresIn: "3d" });
}
