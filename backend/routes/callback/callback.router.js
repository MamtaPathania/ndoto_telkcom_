const express=require('express');
const {getSubscriber} = require('./callback.controller');
const {getbilling}=require('./callback.controller')
const router=express.Router();



router.post('/subscription-callback',getSubscriber)
router.post('/billing-callback',getbilling)



module.exports=router