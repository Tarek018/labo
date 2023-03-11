import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import { verifyToken } from '../middleware/auth';

let router = Router();


require('dotenv').config()


async function hashPassword(plaintextPassword: string) {
    return await bcrypt.hash(plaintextPassword, 10);
}


async function comparePassword(plaintextPassword: string, hash: string) {
    return await bcrypt.compare(plaintextPassword, hash);
}



router.get('/validateToken', verifyToken, (req, res) => {
    res.status(200).send({ auth: true, message: 'Token is valid.' });
})


// regester new user to mongoDb
router.post('/register', async (req, res) => {
    const user = req.body;
    const plaintextPassword = user.password;
    let hashedPassword = await hashPassword(plaintextPassword);
    const userExists = await User.findOne({email: req.body.email})
    if (userExists) {
        res.status(400).send({ auth: false, message: 'User already exists.' });
    }
    else {
        const newUser = new User({
            name: user.name,
            email: user.email,
            picLink: "test",
            password: hashedPassword
        })
        await newUser.save().then((result) => {
            const token = jwt.sign({ userId: result.id}, process.env.RSA_PRIVATE_KEY, {
                algorithm: 'RS256',
                expiresIn: "30d",
                subject: result.id
            });
            res.status(200).json({ auth: true, token: token, uid: result.id, type: "user" });
        })
    }

});

// login user to mongoDb
router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const userExists = await User.findOne({email: email})
    if (!userExists) {
        res.status(400).send({ auth: false, message: 'User does not exist.' });
    }
    else {
        const validPassword = await comparePassword(password, userExists.password);
        if (!validPassword) {
            res.status(400).send({ auth: false, message: 'Invalid password.' });
        }
        else {
            const token = jwt.sign({ userId: userExists.id}, process.env.RSA_PRIVATE_KEY, {
                algorithm: 'RS256',
                expiresIn: "30d",
                subject: userExists.id
            });
            res.status(200).json({ auth: true, token: token, uid: userExists.id, type: "user" });
        }
    }

})



export default router;