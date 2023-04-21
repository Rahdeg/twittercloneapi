import {
  createTweet,
  deleteTweetById,
  getTweetById,
  getTweets,
  updateTweetById,
} from "../db/tweet";
import { getUserById } from "../db/users";
import express from "express";

export const createTweets = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { content } = req.body;
    const user = await getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: `No user with id ${req.params.id}` });
    }

    const data = {
      user_id: user.id,
      content: content,
    };

    const tweet = await createTweet(data);
    return res.status(201).json(tweet);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAllTweets = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const user = await getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: `No user with id ${req.params.id}` });
    }
    const tweets = await getTweets(user.id);
    res.status(200).json({ message: "Tweets retrieved successfully", tweets });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve tweets", error });
  }
};

export const getTweet = async (req: express.Request, res: express.Response) => {
  try {
    const user = await getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: `No user with id ${req.params.id}` });
    }

    const tweet = await getTweetById(req.params.tweetId);
    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }
    res.status(200).json({ message: "Tweet retrieved successfully", tweet });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve tweet", error });
  }
};

export const updateTweets = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { content } = req.body;
    const user = await getUserById(req.params.id);
    const tweet = await getTweetById(req.params.tweetId);

    if (!user) {
      return res.status(404).json({ msg: `No user with id ${req.params.id}` });
    }

    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }

    tweet.content = content;
    await tweet.save();

    res.status(200).json({ message: "Tweet updated successfully", tweet });
  } catch (error) {
    res.status(500).json({ message: "Failed to update tweet", error });
  }
};

export const deleteTweet = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const user = await getUserById(req.params.id);
    const tweet = await getTweetById(req.params.tweetId);

    if (!user) {
      return res.status(404).json({ msg: `No user with id ${req.params.id}` });
    }

    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }

    const deletedTweet = await deleteTweetById(tweet.id);

    res
      .status(200)
      .json({ message: "Tweet deleted successfully", deletedTweet });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete tweet", error });
  }
};
