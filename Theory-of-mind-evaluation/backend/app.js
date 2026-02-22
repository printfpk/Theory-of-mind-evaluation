const express = require('express');
const cors = require('cors');
const evaluationRoutes = require('./routes/evaluationRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Body parser

// Routes
app.use('/api/evaluations', evaluationRoutes);

// Health check
app.get('/', (req, res) => {
    res.send('API is running...');
});

module.exports = app;
