const User = require("../../models/userModel");
const Follow = require("../../models/followModel");
const passwordHelper = require("../../helpers/passwordHelper");
const jwt = require("jsonwebtoken");

module.exports.signUp = async (req, res) => {
  try {
    const { username, password, profilePicture, bio } = req.body;
    if (!username || !password) {
      return res.status(400).send({
        success: false,
        message: "Please fill all the details",
      });
    }
    const user = await User.findOne({ username });

    if (!user) {
      const hashedPassword = await passwordHelper.hashingPasswordFunction(
        password
      );
      let userProfile = { username, password: hashedPassword };

      if (profilePicture) userProfile.profilePicture = profilePicture;
      if (bio) userProfile.bio = bio;

      const newUser = await User.create(userProfile);
      return res.status(200).send({
        success: true,
        message: "User Created successfully",
        newUser,
      });
    } else {
      return res.status(200).send({
        success: false,
        message: "User already exists",
      });
    }
  } catch (error) {
    console.log(`Errror in creating the user ${error}`);
    return res.status(500).send({
      success: false,
      error: error,
      message: "Internal server error",
    });
  }
};

module.exports.singIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      const matchPassword = await passwordHelper.compareHashedPasswordFunction(
        password,
        user.password
      );
      if (matchPassword) {
        const jwtToken = await jwt.sign(
          user.tosend(),
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: "60d",
          }
        );
        return res.status(200).send({
          success: true,
          message: "User signin successful",
          user: {
            jwtToken,
          },
        });
      } else {
        return res.status(400).send({
          success: false,
          message: "Incorrect password",
        });
      }
    } else {
      return res.status({
        success: false,
        message: "You are not registered",
      });
    }
  } catch (error) {
    console.log(`Error in signing in the user ${error}`);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports.viewProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user) {
      const { password, ...userDetails } = user.toObject();

      return res.status(200).send({
        success: true,
        message: "User found successfully",
        user: userDetails,
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "User doesnot exists",
      });
    }
  } catch (error) {
    console.log(`Error in getting user ${error}`);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const { id } = req.user; // Assuming req.user contains the authenticated user's information
    const userData = req.body;

    // Check if the user exists
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update user fields
    Object.keys(userData).forEach((key) => {
      // Exclude password field from update
      if (key !== "password") {
        existingUser[key] = userData[key];
      }
    });

    // Save updated user
    const updatedUser = await existingUser.save();

    // Exclude password field from the updated user object
    const { password, ...userWithoutPassword } = updatedUser.toObject();

    return res.status(200).send({
      success: true,
      message: "User updated successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.user; // Assuming req.user contains the authenticated user's information

    // Check if the user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    await User.deleteOne({ _id: id });

    return res.status(200).send({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports.toggleFollow = async (req, res) => {
  try {
    const { id: userIdToFollow } = req.params;
    const followerId = req.user.id;

    // Check if the user to follow exists
    const userExists = await User.exists({ _id: userIdToFollow });
    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: "User to follow not found",
      });
    }

    // Check if there is an existing follow relationship
    const existingFollow = await Follow.findOneAndDelete({
      follower: followerId,
      following: userIdToFollow,
    });

    // Toggle follow/unfollow based on the existence of the follow relationship
    if (existingFollow) {
      return res.status(200).send({
        success: true,
        message: "Unfollowed user successfully",
      });
    } else {
      // Follow
      const newFollow = await Follow.create({
        follower: followerId,
        following: userIdToFollow,
      });
      return res.status(200).send({
        success: true,
        message: "Followed user successfully",
        follow: newFollow,
      });
    }
  } catch (error) {
    console.error("Error toggling follow:", error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports.getFollowersAndFollowing = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find all follow relationships where the current user is being followed
    const followerList = await Follow.find({ following: userId }).populate(
      "follower",
      "username bio profilePicture"
    );

    // Find all follow relationships where the current user is the follower
    const followingList = await Follow.find({ follower: userId }).populate(
      "following",
      "username bio profilePicture"
    );

    // Extract follower details from the follower list
    const followers = followerList.map((follow) => ({
      username: follow.follower.username,
      bio: follow.follower.bio,
      profilePicture: follow.follower.profilePicture,
    }));

    // Extract following user details from the following list
    const following = followingList.map((follow) => ({
      username: follow.following.username,
      bio: follow.following.bio,
      profilePicture: follow.following.profilePicture,
    }));

    return res.status(200).send({
      success: true,
      message: "Follower and following lists retrieved successfully",
      followers,
      following,
    });
  } catch (error) {
    console.error("Error retrieving follower and following lists:", error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
