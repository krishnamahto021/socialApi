const mongoose = require("mongoose");
const userModel = mongoose.Schema({
  username: { type: String, unique: true, required: true },
  bio: { type: String },
  password: { type: String, required: true },
  profilePicture: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  },
});

const User = mongoose.model("User", userModel);

module.exports = User;
