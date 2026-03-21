const Users = require("../models/user");

exports.getProfile = async (req, res) => {
  try {
    const userData = await Users.findById(req.userID).select(
      "-password -__v -refreshToken",
    );
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: userData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.userID;

    //prevent role and password update
    const { role, password, ...updates } = req.body;

    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      { $set: updates },
      {
        returnDocument: "after",
        runValidators: true,
      },
    ).select("-password -__v -refreshToken");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "profile update successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "update failed",
    });
  }
};
