import { Router } from "express";
import { verifyToken } from "../middleware/auth";

import Post from '../models/postModel';
import PostInterface from '../models/interfaces/post';




let router = Router();


router.get('/getAllPosts', async (req, res) => {
    try {
        const posts = await Post.find()
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

router.get('/getUserPost', async (req, res) => {

    try {
        const post = await Post.findById(req.query.id)
        res.status(200).json(post);
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
  
})


export default router;
