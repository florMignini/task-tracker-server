import { Request, Response } from "express";
//model import
import {
  confirmationToken,
  forgottenPasswordVerification,
  generateJWT,
  registerVerification,
} from "../helpers/index.ts";
import { User } from "../models/User.ts";

const register = async (req: Request, res: Response) => {
  //aviod duplicated register user
  const { email } = req.body;
  const userAlreadyExist = await User.findOne({ email });
  console.log(userAlreadyExist)
  if (userAlreadyExist) {
    const error = new Error(`User ${email} already exists`);
    return res.status(400).json({
      msg: error.message,
    });
  }

  try {
    //new user creation
    const newUser = new User(req.body);
    newUser.token = confirmationToken();
    const newUserCreated = await newUser.save();

    /* send account verification email */
    registerVerification({
      email: newUserCreated.email,
      name: newUserCreated.name,
      token: newUserCreated.token,
    });

    return res.status(201).json({
      msg: "Account successfully created, check your email and verify it.",
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  //confirm if user exist
  const userExist = await User.findOne({ email });
  
  if (!userExist) {
    const error = new Error(`User with email: ${email} is not registered`);
    res.status(403).json({ message: error.message });
  }

  //confirm if user is confirmed
  if (!userExist.confirm) {
    const error = new Error(`User with email: ${email} is not confirmed`);
    res.status(403).json({ message: error.message });
  }

  //compare password
  if (await userExist.comparePassword(password)) {
    res.status(200).json({
      _id: userExist._id,
      name: userExist.name,
      email: userExist.email,
      token: generateJWT(userExist._id),
    });
  } else {
    const error = new Error(`Wrong password`);
    res.status(403).json({ message: error.message });
  }
};

const confirmSession = async (req: Request, res: Response) => {
  const { token } = req.params;

  const userToConfirm = await User.findOne({ token });

  if (!userToConfirm) {
    const error = new Error(`Access denied`);
    return res.status(403).json({ message: error.message });
  }

  try {
    //confirm the user account
    userToConfirm.confirm = true;
    //reset token on user model
    userToConfirm.token = null;
    await userToConfirm.save();
    return res.status(200).json({
      msg: `Account successfully verified, Welcome to task-tracker app`,
    });
  } catch (error: any) {
    return res.status(403).json({ message: error.message });
  }
};

const recoverPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  const userExist = await User.findOne({ email });
  if (!userExist) {
    const error = new Error(`User ${email} does not exists`);
    return res.status(400).json({
      msg: error.message,
    });
  }

  try {
    userExist.token = generateJWT(userExist._id);
    await userExist.save();
    /* send recovery password email */
    forgottenPasswordVerification({
      email: userExist.email,
      name: userExist.name,
      token: userExist.token,
    });
    return res.status(200).json({
      msg: `Password recovery link sent to ${email}`,
    });
  } catch (error: any) {
    return res.status(403).json({ message: error.message });
  }
};

const verifyToken = async (req: Request, res: Response) => {
  const { token } = req.params;

  const isValidToken = await User.findOne({ token });

  if (isValidToken) {
    res.status(200).json({
      msg: `Token valid`,
    });
  } else {
    const error = new Error(`invalid token`);
    return res.status(403).json({
      msg: error.message,
    });
  }
};

const updatePassword = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { password } = req.body;

  const userByToken = await User.findOne({ token });

  if (userByToken) {
    //create a new password
    userByToken.password = password;
    //reset token on user model
    userByToken.token = null;
    try {
      await userByToken.save();
      res.status(200).json({
        msg: `Password successfully updated`,
      });
    } catch (error: any) {
      console.log(error);
    }
  } else {
    const error = new Error(`invalid token`);
    return res.status(403).json({
      msg: error.message,
    });
  }
};

const userProfile = async (req: any, res: Response) => {
  const { user } = req;
  res.status(200).json(user);
};

export {
  register,
  login,
  confirmSession,
  recoverPassword,
  verifyToken,
  updatePassword,
  userProfile,
};
