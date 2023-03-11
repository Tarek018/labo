import { Router } from "express";
import { verifyToken } from "../middleware/auth";
import User from '../models/userModel';
import Post from '../models/postModel';
import PostInterface from '../models/interfaces/post';

let router = Router();

router.get('/getMyPosts', verifyToken, async (req, res) => {
    try {
        const post = await Post.find({userId: req.query.id})
        res.status(200).json(post);
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
  
})

router.get('/getMyPost', verifyToken, async (req, res) => {

    try {
        const post = await Post.findOne({_id: req.query.id})
        res.status(200).json(post);
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
  
})




// add a post to mongoDB
router.post('/addPost', verifyToken, async (req, res) => {
    const post = new Post<PostInterface>({
        userId: req.body.id,
        userPicLink: req.body.userPicLink,
        postContent: req.body.postContent
    })
    await post.save()
    res.status(200).send();
})

// update the post on mongodb
router.put('/updatePost/:id', verifyToken, async (req, res) => {
    try {
        await Post.updateOne({_id: req.params.id},
            {
                postContent: req.body.postContent
            }
            )
            res.status(200).send();
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

// update a user information on mongodb
router.put('/updateUser/:id', verifyToken, async (req, res) => {
    try {
        await User.updateOne({_id: req.params.id},
            {
                name: req.body.name,
                email: req.body.email,
                picLink: req.body.picLink,
            }
            )
            res.status(200).send();
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

// delete a post from mongoDB
router.delete('/deletePost/:id', verifyToken, async (req, res) => {
    try {
        await Post.deleteOne({_id: req.params.id})
        res.status(200).send();
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

export default router;