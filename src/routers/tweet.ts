import express from 'express';
import {createTweets} from '../controllers/tweet'
import {isAuthenticated,isOwner} from '../middlewares'

export default (router : express.Router)=>{
    router.post('/users/:id/tweet',isAuthenticated,isOwner,createTweets);
}