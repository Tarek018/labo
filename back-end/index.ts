import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const port              = process.env.PORT || 4000;
import jwt from 'jsonwebtoken';
import logger from 'morgan';
import methodOverride from 'method-override';
import cors from 'cors';

// routes
import users from './routes/users';
import auth from './routes/auth';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200']
}))

// Connect to MongoDB
const mongoDB = process.env.MONGO_URI;
mongoose.connect(mongoDB)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


// parse application/json
app.use(bodyParser.json());

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))


// routes
app.use('/users', users);
app.use('/auth', auth);



app.listen(port, () => console.log("Server Started Running on port " + port));