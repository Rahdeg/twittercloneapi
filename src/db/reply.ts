import mongoose from 'mongoose';

const ReplySchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true
    },
    tweet_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet',
        required: true
      },
    content:{type:String,required:[true, "Please add a content"]},
    
},{timestamps:true});

export const ReplyModel = mongoose.model('Replys',ReplySchema);


export const getReplys =()=> ReplyModel.find();
export const getReplyById = (id:string) => ReplyModel.findById(id);
export const createReplys = (values: Record<string, any>) => new ReplyModel(values).save().then((user)=>user.toObject());
export const deleteReplyById =(id:string) => ReplyModel.findOneAndDelete({_id:id});
export const updateReplyById =(id:string, values:Record<string, any>)=>ReplyModel.findByIdAndUpdate(id,values);