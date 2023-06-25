import express from 'express'
import { createPost, getPosts,updatePost,deletePost,likedPost } from '../controllers/posts.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/',getPosts)
router.post('/',auth,createPost)
router.put('/:id',auth,updatePost)
router.delete('/:id',auth,deletePost)
router.put('/:id/likedPost',auth,likedPost)

export default router