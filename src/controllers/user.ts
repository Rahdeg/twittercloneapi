import express from "express";
import { deleteUserById, getUserById, getUsers } from "../db/users";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();
    return res.status(200).json(users).end();
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const getUser = async (req: express.Request, res: express.Response) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User retrieved successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve user", error });
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUserById(id);
    if (!deletedUser) {
      return res.sendStatus(403);
    }

    return res.status(200).json(deletedUser);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { username } = req.body;
    if (!username) {
      return res.sendStatus(403);
    }
    const user = await getUserById(id);
    if (!user) {
      return res.sendStatus(403);
    }

    user.username = username;
    await user?.save();
    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};
