const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const categoriesRoute = require('./routes/categoriesRoutes');
const seriesRoute = require('./routes/seriesRoutes');
const imageRoute = require('./routes/imageRoute');
const productRoute = require('./routes/productRoutes');
const variantsProductRoute = require('./routes/variantsProductRoutes');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const bannerRoutes = require('./routes/bannerRoutes');
const customerRoutes = require('./routes/customerRoutes');
const orderRoutes = require('./routes/orderRoutes');
const storeRoutes = require('./routes/storeRoutes');

const uri =
    'mongodb+srv://buithiendev:yenanh123@deathshopcluster.20cpy1e.mongodb.net/?retryWrites=true&w=majority';

const app = express();
require('dotenv').config();

const corsOptions = {
    origin: [
        'http://localhost:3001',
        'http://localhost:3000',
        'https://storage.googleapis.com/deathshop-15e27.appspot.com',
    ],
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use('/api/auth', userRoutes);
app.use('/api/categories', categoriesRoute);
app.use('/api/series', seriesRoute);
app.use('/api/images', imageRoute);
app.use('/api/product', productRoute);
app.use('/api/variant', variantsProductRoute);
app.use('/api/banner', bannerRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/store', storeRoutes);
// mongoose
//     .connect(process.env.MONGO_URL, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then(() => {
//         console.log('DB connection succesfull');
//     })
//     .catch((err) => {
//         console.log(err.message);
//     });

mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('DB connection succesfull');
    })
    .catch((err) => {
        console.log(err.message);
    });

const server = app.listen(process.env.PORT, () => {
    console.log(`Server stated on PORT ${process.env.PORT}`);
});
