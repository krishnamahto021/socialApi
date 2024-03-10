const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  textContent: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
