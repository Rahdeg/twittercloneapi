import express from "express";
import { get, merge } from "lodash";
import { getUserBySessionToken } from "../db/users";

export const isOwner = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, "identity._id") as unknown as string;
    if (!currentUserId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (currentUserId.toString() !== id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    next();
  } catch (error) {
    res.sendStatus(400);
  }
};

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies["RAHEEM_AUTH"];
    if (!sessionToken) {
      return res.status(404).json({ message: "Unauthorized" });
    }
    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser) {
      return res.status(404).json({ message: "Unauthorized" });
    }
    merge(req, { identity: existingUser });
    return next();
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};
