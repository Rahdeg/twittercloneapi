import express from "express";
import {
  createReply,
  getAllReplies,
  getReply,
  updateReply,
  deleteReply,
} from "../controllers/reply";
import { isAuthenticated, isOwner } from "../middlewares";

export default (router: express.Router) => {
  router.post(
    "/users/:id/tweet/:tweetId",
    isAuthenticated,
    isOwner,
    createReply
  );
  router.get(
    "/users/:id/tweet/:tweetId/replies",
    isAuthenticated,
    isOwner,
    getAllReplies
  );
  router.get(
    "/users/:id/tweet/:tweetId/replies/:replyId",
    isAuthenticated,
    isOwner,
    getReply
  );
  router.put(
    "/users/:id/tweet/:tweetId/replies/:replyId",
    isAuthenticated,
    isOwner,
    updateReply
  );
  router.delete(
    "/users/:id/tweet/:tweetId/replies/:replyId",
    isAuthenticated,
    isOwner,
    deleteReply
  );
};
