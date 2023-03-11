import mongoose from 'mongoose'
import User from './interfaces/user'


const userSchema = new mongoose.Schema<User>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    picLink: {
        type: String,
        required: true
    }
})
const User = mongoose.model<User>('User', userSchema);
export default User
