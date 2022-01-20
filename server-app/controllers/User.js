const UserService = require("../services/UserService");

const getUser = async (req, res) => {
  try {
    const user = await UserService.findUser(req.params.userId);
    res.status(200).json(user);
  } catch (error) {
    res.sendStatus(500);
  }
};

const login = async (req, res) => {
  try {
    const user = await UserService.findEmail(req.body.email);
    const passwordOk = await user.comparePassword(req.body.password);

    if (!passwordOk) {
      res.sendStatus(401);
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

const register = async (req, res) => {
  try {
    const checkForDuplicateUser = await UserService.checkDuplicateUser(
      req.body.email
    );

    if (checkForDuplicateUser === 0) {
      await UserService.create(req.body);
      res.sendStatus(201);
    }

    res.sendStatus(409);
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = {
  getUser,
  login,
  register,
};
