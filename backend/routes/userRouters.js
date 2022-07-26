import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';

import User from '../models/userModel.js';
import { generateToken } from '../utils.js';

const userRouter = express.Router();

userRouter.post(
    '/signin',
    expressAsyncHandler(async (req, res) => {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.send({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user),
                });
                return;
            }
        }
        res.status(401).send({ message: 'Invalid email or password!' });
    })
);

userRouter.post(
    '/signup',
    expressAsyncHandler(async (req, res) => {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password),
            });
            const createUser = await newUser.save();
            res.send({
                _id: createUser._id,
                name: createUser.name,
                email: createUser.email,
                isAdmin: createUser.isAdmin,
                token: generateToken(createUser),
            });
        }
        res.status(401).send({
            message: 'User with this email already exists!',
        });
    })
);

export default userRouter;
