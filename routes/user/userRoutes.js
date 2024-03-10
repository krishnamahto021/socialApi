const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController/userController");
const passport = require("passport");

router.post("/sign-up", userController.signUp);
router.post("/sign-in", userController.singIn);
router.get("/view-profile/:id", userController.viewProfile);
router.post(
  "/update-profile",
  passport.authenticate("jwt", { session: false }),
  userController.updateUser
);
router.delete(
  "/delete-profile",
  passport.authenticate("jwt", { session: false }),
  userController.deleteUser
);

module.exports = router;
