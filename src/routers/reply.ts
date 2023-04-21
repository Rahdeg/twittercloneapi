import express from 'express';
import {createReply} from '../controllers/reply'
import {isAuthenticated,isOwner} from '../middlewares'

export default (router : express.Router)=>{
    router.post('/users/:id/tweet/:tweetId',isAuthenticated,isOwner,createReply);
    // router.get('/users/:id/tweet',isAuthenticated,isOwner,getAllTweets);
    // router.get('/users/:id/tweet/:tweetId',isAuthenticated,isOwner,getTweet);
    // router.put('/users/:id/tweet/:tweetId',isAuthenticated,isOwner,updateTweets);
    // router.delete('/users/:id/tweet/:tweetId',isAuthenticated,isOwner,deleteTweet);
}