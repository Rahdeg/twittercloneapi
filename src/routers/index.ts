import express from 'express';
import authentication from './authentication'
import users from './users'
import tweets from './tweet';
const router = express.Router();


export default (): express.Router =>{
    authentication(router);
    users(router);
    tweets(router);
    return router;
};