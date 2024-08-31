const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Allow requests from other origins

// Define Routes
app.use('/api/users', require('./routes/users'));

// Serve static assets from the frontend folder
app.use(express.static('../frontend'));

// Define a simple route
app.get('/', (req, res) => {
    res.send('Alumni-Student Platform API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
