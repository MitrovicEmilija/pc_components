const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const componentRoutes = require('./routes/components');

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api/components', componentRoutes);

// Start the server
const PORT = process.env.PORT || 5001;
if (process.env.NODE_ENV !== 'test') {
    app.listen(5001, () => {
        console.log('Server running on port 5001');
    });
}


module.exports = app;