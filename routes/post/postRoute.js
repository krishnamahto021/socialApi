const express = require("express");
const postController = require("../../controllers/postController/postController");
const passport = require("passport");

const router = express.Router();
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  postController.viewPost
);

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  postController.createPost
);

router.post(
  "/update-post/:postId",
  passport.authenticate("jwt", { session: false }),
  postController.updatePost
);

router.delete(
  "/delete-post/:postId",
  passport.authenticate("jwt", { session: false }),
  postController.deletePost
);

module.exports = router;
