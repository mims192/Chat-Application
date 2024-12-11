import express from 'express'
import { sendMessage,getMessages } from '../controllers/messageController.js';
import isLogin from '../middleware/isLogin.js';

const router=express.Router();

router.post('/send/:id',isLogin,sendMessage)       //after checking islogin then next() function will allow to sendmessage
router.get('/:id',isLogin,getMessages) //getting in frontend
export default router;