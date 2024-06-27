const express=require('express');
const {getSubscription} = require('./subscription.controller');
const {checkSubscriber} = require('./subscription.controller');
const router=express.Router();



router.post('/subscription',getSubscription)
 router.get('/check-sub',checkSubscriber)

module.exports=router