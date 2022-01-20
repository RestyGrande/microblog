const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 12;

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      index: { unique: true },
      mixlength: 2,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: { unique: true },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      index: { unique: true },
      mixlength: 5,
    },
  },
  { timestamps: { createdAt: "created_at" } }
);
UserSchema.pre("save", async function preSave(next) {
  const user = this;
  if (!user.isModified("password")) return next();
  try {
    const hash = await bcrypt.hash(user.password, SALT_ROUNDS);
    user.password = hash;
    return next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.methods.comparePassword = async function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};
module.exports = mongoose.model("User", UserSchema);
