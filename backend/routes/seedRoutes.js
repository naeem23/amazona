import express from 'express';

import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import data from '../data.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
    // create users
    await User.remove({});
    const createdusers = await User.insertMany(data.users);

    // create products
    await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);

    res.send({ createdusers, createdProducts });
});

export default seedRouter;
