import express from 'express';
import {createTweets,getAllTweets,getTweet,updateTweets,deleteTweet} from '../controllers/tweet'
import {isAuthenticated,isOwner} from '../middlewares'

export default (router : express.Router)=>{
    router.post('/users/:id/tweet',isAuthenticated,isOwner,createTweets);
    router.get('/users/:id/tweet',isAuthenticated,isOwner,getAllTweets);
    router.get('/users/:id/tweet/:tweetId',isAuthenticated,isOwner,getTweet);
    router.put('/users/:id/tweet/:tweetId',isAuthenticated,isOwner,updateTweets);
    router.delete('/users/:id/tweet/:tweetId',isAuthenticated,isOwner,deleteTweet);
}