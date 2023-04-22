import { getTweetById } from "../db/tweet";
import {
  createReplys,
  deleteReplyById,
  getReplys,
  getReplyById,
} from "../db/reply";
import { getUserById } from "../db/users";
import express from "express";

export const createReply = async (
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
      return res
        .status(404)
        .json({ msg: `No tweet with id ${req.params.tweetId}` });
    }

    const data = {
      user_id: user.id,
      tweet_id: tweet.id,
      content: content,
    };
    const reply = await createReplys(data);

    tweet.replies.push(reply._id);
    await tweet.save();

    return res.status(201).json(reply);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAllReplies = async (
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
      return res.status(404).json({ msg: `No tweet with id ${req.params.id}` });
    }

    const replies = await getReplys(tweet.id);
    res
      .status(200)
      .json({ message: "Replies retrieved successfully", replies });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve Replies", error });
  }
};

export const getReply = async (req: express.Request, res: express.Response) => {
  try {
    const user = await getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: `No user with id ${req.params.id}` });
    }

    const tweet = await getTweetById(req.params.tweetId);
    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }
    const reply = await getReplyById(req.params.replyId);

    if (!reply) {
      return res.status(404).json({ message: "Reply not found" });
    }

    res.status(200).json({ message: "Reply retrieved successfully", reply });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve Reply", error });
  }
};

export const updateReply = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { content } = req.body;
    const user = await getUserById(req.params.id);
    const tweet = await getTweetById(req.params.tweetId);
    const reply = await getReplyById(req.params.replyId);

    if (!user) {
      return res.status(404).json({ msg: `No user with id ${req.params.id}` });
    }

    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }

    if (!reply) {
      return res.status(404).json({ message: "Reply not found" });
    }

    reply.content = content;
    await reply.save();

    res.status(200).json({ message: "Reply updated successfully", reply });
  } catch (error) {
    res.status(500).json({ message: "Failed to update reply", error });
  }
};

export const deleteReply = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const user = await getUserById(req.params.id);
    const tweet = await getTweetById(req.params.tweetId);
    const reply = await getReplyById(req.params.replyId);

    if (!user) {
      return res.status(404).json({ msg: `No user with id ${req.params.id}` });
    }

    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }

    if (!reply) {
      return res.status(404).json({ message: "Tweet not found" });
    }

    const deletedReply = await deleteReplyById(reply.id);

    res
      .status(200)
      .json({ message: "Reply deleted successfully", deletedReply });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete reply", error });
  }
};
