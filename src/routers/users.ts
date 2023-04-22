import express from "express";
import {
  getAllUsers,
  deleteUser,
  updateUser,
  getUser,
} from "../controllers/user";
import { isAuthenticated, isOwner } from "../middlewares";

export default (router: express.Router) => {
  router.get("/users", isAuthenticated, getAllUsers);
  router.get("/users/:id", isAuthenticated, getUser);
  router.delete("/users/:id", isAuthenticated, isOwner, deleteUser);
  router.put("/users/:id", isAuthenticated, isOwner, updateUser);
};
