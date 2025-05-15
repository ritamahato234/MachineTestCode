const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, default: "", index: true },
    email: { type: String, unique: true },
    password: { type: String, default: "", index: true },
    phone: { type: String, default: "" },
    token:{type: String, default: "" },
    gender: { type: String, default: "",enum:["male","female"], index: true },
    role: { type: String, enum: ["admin", "member"] },
    isDeleted:{type:Boolean,default:false}
  },
  { timestamps: true, versionKey: false }
);

UserSchema.pre("save", function (next) {
  var user = this;
  console.log("ismodified:", user.isModified("password"));
  if (!user.isModified("password")) return next();

  const saltRounds = 10;
  bcrypt.hash(user.password, saltRounds, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

UserSchema.methods.comparePassword = function (password) {
  var user = this;
  return bcrypt.compareSync(password, user.password);
};
module.exports = mongoose.model("User", UserSchema);
