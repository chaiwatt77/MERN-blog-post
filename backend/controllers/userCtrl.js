import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";

export const registerUserCtrl = async (req, res) => {
  const { fullname, email, password, username } = req.body;
  try {
    const userExists = await User.findOne({
      $or: [{ email }, { "personal_info.username": username }],
    });
    if (userExists) {
      return res.status(500).json({
        msg: "User already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      fullname,
      email,
      password: hashedPassword,
      username,
    });
    res.status(201).json({
      status: "success",
      message: "User Registered Successful",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUserCtrl = async (req, res) => {
  const { email, password } = req.body;

  const userFound = await User.findOne({
    email,
  });
  if (userFound && (await bcrypt.compare(password, userFound?.password))) {
    res.json({
      status: "success",
      message: "User logged in successfully",
      userFound,
      token: generateToken(userFound?._id)
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Error login",
    });
  }
};

export const getProfileCtrl = async (req, res)=>{
  const token = getTokenFromHeader(req)
  const verified = verifyToken(token)
  const userId = verified.id

  const userProfile = await User.findById(userId).select('-password');
  res.json({data:userProfile})
}
