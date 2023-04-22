import { getUserByEmail, createUser } from "../db/users";
import express from "express";
import { authentication, random } from "../helpers/index";

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(401)
        .json({ message: "Please add a username and password" });
    }
    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const expectedHash = authentication(user.authentication?.salt, password);

    if (user.authentication?.password !== expectedHash) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );
    await user.save();
    res.cookie("RAHEEM_AUTH", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });

    return res.status(200).json(user).end();
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { username, email, password } = req.body;
    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ message: "Please add an email,username and password" });
    }
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(401).json({ message: "User Already exist" });
    }
    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });
    return res.status(200).json(user).end();
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

// const User = require('../models/user');

// // Function to create a new user account
// const createUser = async (req, res) => {
//   try {
//     const { username, password, /* other user-related fields */ } = req.body;

//     // Check if the username is already taken
//     const existingUser = await User.findOne({ username });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Username already taken' });
//     }

//     // Create a new user
//     const user = new User({ username, password, /* other user-related fields */ });
//     await user.save();

//     res.status(201).json({ message: 'User account created successfully', user });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to create user account', error });
//   }
// };

// // Function to login a user
// const loginUser = async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // Find the user by username and password
//     const user = await User.findOne({ username, password });
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid username or password' });
//     }

//     res.status(200).json({ message: 'User logged in successfully', user });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to login user', error });
//   }
// };

// // Other user-related controller functions such as updating user information, deleting user account, etc.
