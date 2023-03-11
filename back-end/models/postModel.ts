import mongoose from 'mongoose'
import Post from './interfaces/post'



const postSchema = new mongoose.Schema<Post>({
    userId: {
        type: String,
        required: true
    },
    userPicLink: {
        type: String,
        required: true
    },
    postContent: {
        type: String,
        required: true
    }
});

const Post = mongoose.model<Post>('Post', postSchema);
export default Post
