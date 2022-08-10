import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import data from './data.js';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';

// configuring dotenv
dotenv.config();

// connecting to mongodb
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected to db');
    })
    .catch((err) => {
        console.log(err.message);
    });

const app = express();

// seed api
app.use('/api/seed', seedRouter);

// product list api
app.use('/api/products', productRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`);
});
