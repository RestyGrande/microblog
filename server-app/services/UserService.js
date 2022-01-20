const UserModel = require("../models/UserModel");

class UserService {
  async findUser(id) {
    return UserModel.findOne({ _id: id }).exec();
  }
  async findEmail(data) {
    return UserModel.findOne({ email: data }).exec();
  }
  async checkDuplicateUser(email) {
    return UserModel.find({ email: email }).count().exec();
  }

  async create(data) {
    const user = new UserModel(data);
    return user.save();
  }
}

module.exports = new UserService();
