const Post = require("../../models/postModel");

module.exports.createPost = async (req, res) => {
  try {
    const { textContent } = req.body;
    const createdBy = req.user.id;

    const post = await Post.create({ textContent, createdBy });

    return res.status(201).send({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports.viewPost = async (req, res) => {
  try {
    const { id } = req.user;
    const posts = await Post.find({ createdBy: id });
    if (posts) {
      return res.status(201).send({
        success: true,
        message: "Posts fetched succesffully",
        posts,
      });
    } else {
      return res.status(201).send({
        success: true,
        message: "No any posts yet",
      });
    }
  } catch (error) {
    console.log(`Error in reading posts ${error}`);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

module.exports.updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { textContent } = req.body;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).send({
        success: false,
        message: "Post not found",
      });
    } else {
      post.textContent = textContent;
      await post.save();
      return res.status(200).send({
        success: true,
        message: "Post updated successfully",
        post,
      });
    }
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findByIdAndDelete(postId);

    if (!post) {
      return res.status(404).send({
        success: false,
        message: "Post not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
