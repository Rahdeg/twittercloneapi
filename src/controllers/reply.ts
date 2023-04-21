import { getTweetById } from "../db/tweet";
import {
    createReplys,
    updateReplyById,
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
      const tweet = await getTweetById(req.params.tweetId)
  
      if (!user) {
        return res.status(404).json({ msg: `No user with id ${req.params.id}` });
      }

      if (!tweet) {
        return res.status(404).json({ msg: `No tweet with id ${req.params.id}` });
      }
  
      const data = {
        user_id: user.id,
        tweet_id: tweet.id,
        content :content
      };
      const reply = await createReplys(data);
      
      tweet.replies.push(tweet.id);
      await tweet.save();

      return res.status(201).json(reply);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };
  
//   export const getAllTweets = async (
//     req: express.Request,
//     res: express.Response
//   ) => {
//     try {
//       const user = await getUserById(req.params.id);
  
//       if (!user) {
//         return res.status(404).json({ msg: `No user with id ${req.params.id}` });
//       }
//       const tweets = await getTweets(user.id);
//       res.status(200).json({ message: "Tweets retrieved successfully", tweets });
//     } catch (error) {
//       res.status(500).json({ message: "Failed to retrieve tweets", error });
//     }
//   };
  
//   export const getTweet = async (req: express.Request, res: express.Response) => {
//     try {
//       const user = await getUserById(req.params.id);
  
//       if (!user) {
//         return res.status(404).json({ msg: `No user with id ${req.params.id}` });
//       }
  
//       const tweet = await getTweetById(req.params.tweetId);
//       if (!tweet) {
//         return res.status(404).json({ message: "Tweet not found" });
//       }
//       res.status(200).json({ message: "Tweet retrieved successfully", tweet });
//     } catch (error) {
//       res.status(500).json({ message: "Failed to retrieve tweet", error });
//     }
//   };
  
//   export const updateTweets = async (
//     req: express.Request,
//     res: express.Response
//   ) => {
//     try {
//       const { content } = req.body;
//       const user = await getUserById(req.params.id);
//       const tweet = await getTweetById(req.params.tweetId);
  
//       if (!user) {
//         return res.status(404).json({ msg: `No user with id ${req.params.id}` });
//       }
  
//       if (!tweet) {
//         return res.status(404).json({ message: "Tweet not found" });
//       }
  
//       tweet.content = content;
//       await tweet.save();
  
//       res.status(200).json({ message: "Tweet updated successfully", tweet });
//     } catch (error) {
//       res.status(500).json({ message: "Failed to update tweet", error });
//     }
//   };
  
//   export const deleteTweet = async (
//     req: express.Request,
//     res: express.Response
//   ) => {
//     try {
//       const user = await getUserById(req.params.id);
//       const tweet = await getTweetById(req.params.tweetId);
  
//       if (!user) {
//         return res.status(404).json({ msg: `No user with id ${req.params.id}` });
//       }
  
//       if (!tweet) {
//         return res.status(404).json({ message: "Tweet not found" });
//       }
  
//       const deletedTweet = await deleteTweetById(tweet.id);
  
//       res
//         .status(200)
//         .json({ message: "Tweet deleted successfully", deletedTweet });
//     } catch (error) {
//       res.status(500).json({ message: "Failed to delete tweet", error });
//     }
//   };
  




























// const Reply = require('../models/reply');

// // Function to create a new reply
// const createReply = async (req, res) => {
//   try {
//     const { content, user, tweet } = req.body;

//     // Create a new reply
//     const reply = new Reply({ content, user, tweet });
//     await reply.save();

//     res.status(201).json({ message: 'Reply created successfully', reply });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to create' } )


//  } }


//     const getAllReplies = async (req, res) => {
//         try {
//           const replies = await Reply.find();
//           res.status(200).json({ message: 'Replies retrieved successfully', replies });
//         } catch (error) {
//           res.status(500).json({ message: 'Failed to retrieve replies', error });
//         }
//       };
      
//       // Function to get a reply by id
//       const getReplyById = async (req, res) => {
//         try {
//           const replyId = req.params.id;
//           const reply = await Reply.findById(replyId);
//           if (!reply) {
//             return res.status(404).json({ message: 'Reply not found' });
//           }
//           res.status(200).json({ message: 'Reply retrieved successfully', reply });
//         } catch (error) {
//           res.status(500).json({ message: 'Failed to retrieve reply', error });
//         }
//       };


//       const deleteReplyById = async (req, res) => {
//         try {
//           const replyId = req.params.id;
//           const reply = await Reply.findByIdAndDelete(replyId);
//           if (!reply) {
//             return res.status(404).json({ message: 'Reply not found' });
//           }
//           res.status(200).json({ message: 'Reply deleted successfully', reply });
//         } catch (error) {
//           res.status(500).json({ message: 'Failed to delete reply', error });
//         }
//       };



//       const Tweet = require('../models/tweet');

// // Function to increase likes count of a tweet by id
// const increaseTweetLikes = async (req, res) => {
//   try {
//     const tweetId = req.params.id;
//     const tweet = await Tweet.findByIdAndUpdate(
//       tweetId,
//       { $inc: { likes: 1 } }, // Increase likes count by 1 like +=1
//       { new: true }
//     );
//     if (!tweet) {
//       return res.status(404).json({ message: 'Tweet not found' });
//     }
//     res.status(200).json({ message: 'Likes count increased successfully', tweet });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to increase likes count', error });
//   }
// };

// // Function to increase retweets count of a tweet by id
// const increaseTweetRetweets = async (req, res) => {
//   try {
//     const tweetId = req.params.id;
//     const tweet = await Tweet.findByIdAndUpdate(
//       tweetId,
//       { $inc: { retweets: 1 } }, // Increase retweets count by 1
//       { new: true }
//     );
//     if (!tweet) {
//       return res.status(404).json({ message: 'Tweet not found' });
//     }
//     res.status(200).json({ message: 'Retweets count increased successfully', tweet });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to increase retweets count', error });
//   }
// };

// // Function to decrease likes count of a tweet by id
// const decreaseTweetLikes = async (req, res) => {
//   try {
//     const tweetId = req.params.id;
//     const tweet = await Tweet.findByIdAndUpdate(
//       tweetId,
//       { $inc: { likes: -1 } }, // Decrease likes count by 1
//       { new: true }
//     );
//     if (!tweet) {
//       return res.status(404).json({ message: 'Tweet not found' });
//     }
//     res.status(200).json({ message: 'Likes count decreased successfully', tweet });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to decrease likes count', error });
//   }
// };

// // Function to decrease retweets count of a tweet by id
// const decreaseTweetRetweets = async (req, res) => {
//   try {
//     const tweetId = req.params.id;
//     const tweet = await Tweet.findByIdAndUpdate(
//       tweetId,
//       { $inc: { retweets: -1 } }, // Decrease retweets count by 1
//       { new: true }
//     );
//     if (!tweet) {
//       return res.status(404).json({ message: 'Tweet not found' });
//     }
//     res.status(200).json({ message: 'Retweets count decreased successfully', tweet });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to decrease retweets count', error });
//   }
// };
