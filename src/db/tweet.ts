import mongoose from 'mongoose';

const TweetSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reply'
      }],
    content:{type:String,required:[true, "Please add a content"]},
    retweet:{type:String,default:null},
    likes:{type:String,default:null},
},{timestamps:true});

export const TweetModel = mongoose.model('Tweets',TweetSchema);


export const getTweets =()=> TweetModel.find();
export const getTweetById = (id:string) => TweetModel.findById(id);
export const createTweet = (values: Record<string, any>) => new TweetModel(values).save().then((user)=>user.toObject());
export const deleteTweetById =(id:string) => TweetModel.findOneAndDelete({_id:id});
export const updateTweetById =(id:string, values:Record<string, any>)=>TweetModel.findByIdAndUpdate(id,values);