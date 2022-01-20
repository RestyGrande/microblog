const mongoose = require("mongoose");

module.exports.connect = async (db) => {
  mongoose.connect(db, {
    useNewUrlParser: true,
  });
};
