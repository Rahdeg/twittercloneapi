import express from "express";
import {
  createTweets,
  getAllTweets,
  getTweet,
  updateTweets,
  deleteTweet,
  increaseTweets,
  decreaseTweets,
  increaseLikes,
  decreaseLikes,
} from "../controllers/tweet";
import { isAuthenticated, isOwner } from "../middlewares";

export default (router: express.Router) => {
  router.post("/users/:id/tweet", isAuthenticated, isOwner, createTweets);
  router.get("/users/:id/tweet", isAuthenticated, isOwner, getAllTweets);
  router.get("/users/:id/tweet/:tweetId", isAuthenticated, isOwner, getTweet);
  router.put(
    "/users/:id/tweet/:tweetId",
    isAuthenticated,
    isOwner,
    updateTweets
  );
  router.put(
    "/users/:id/addretweet/:tweetId",
    isAuthenticated,
    isOwner,
    increaseTweets
  );
  router.put(
    "/users/:id/remretweet/:tweetId",
    isAuthenticated,
    isOwner,
    decreaseTweets
  );
  router.put(
    "/users/:id/addlikes/:tweetId",
    isAuthenticated,
    isOwner,
    increaseLikes
  );
  router.put(
    "/users/:id/remlikes/:tweetId",
    isAuthenticated,
    isOwner,
    decreaseLikes
  );
  router.delete(
    "/users/:id/tweet/:tweetId",
    isAuthenticated,
    isOwner,
    deleteTweet
  );
};
