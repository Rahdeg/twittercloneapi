import mongoose from "mongoose";

const TweetSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reply",
      },
    ],
    content: { type: String, required: [true, "Please add a content"] },
    retweet: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const TweetModel = mongoose.model("Tweets", TweetSchema);

export const getTweets = (id: string) => TweetModel.find({ user_id: id });
export const getTweetById = (id: string) => TweetModel.findById(id);
export const createTweet = (values: Record<string, any>) =>
  new TweetModel(values).save().then((user) => user.toObject());
export const deleteTweetById = (id: string) =>
  TweetModel.findOneAndDelete({ _id: id });
export const updateTweetById = (id: string, values: Record<string, any>) =>
  TweetModel.findByIdAndUpdate(id, values, { new: true });
