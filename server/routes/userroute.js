import express from 'express'
import isLogin from '../middleware/isLogin.js';
import { getuserBySearch,getCurrentChatters} from '../controllers/userhandlerController.js';
const router=express.Router()

router.get('/search',isLogin,getuserBySearch);
router.get('/currentchatters',isLogin,getCurrentChatters)

export default router