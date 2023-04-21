import express from 'express';
import authentication from './authentication'
import users from './users'
import tweets from './tweet';
import replys from './reply'
const router = express.Router();


export default (): express.Router =>{
    authentication(router);
    users(router);
    tweets(router);
    replys(router);
    return router;
};