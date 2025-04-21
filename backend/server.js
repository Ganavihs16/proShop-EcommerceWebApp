const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const cors = require('cors'); // Import cors here

const connectDB = require('./config/db.js');
const passport = require('./config/passport.js');
const productRoutes = require('./routes/productRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');
const uploadRoutes = require('./routes/uploadRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const { notFound, erroHandler } = require('./middleware/errorMiddleware.js');

dotenv.config();

connectDB();

const app = express(); // Declare app FIRST

app.use(cors({ // Use cors after app is declared
    origin: 'http://localhost:3000', // Or your frontend's origin or a function for multiple origins
    credentials: true, // If you need to handle cookies
}));

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.set('trust proxy', 1);
}

// Sessions
app.use(
    session({
        secret: process.env.SESSION_SECRET_PROSHOP,
        resave: false,
        saveUninitialized: false,
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/auth', authRoutes);

app.use('/uploads', express.static(path.join(__dirname, './uploads')));

app.get('/', (req, res) => {
    res.send('API is running');
});

app.use(notFound);
app.use(erroHandler);

const PORT = process.env.PORT_PROSHOP || 5000;

app.listen(PORT, () =>
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
    )
);