const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS
const app = express();
const getGreeting = require('./routes/getGreeting');
const getItems = require('./routes/getItems');
const addItem = require('./routes/addItem');
const updateItem = require('./routes/updateItem');
const deleteItem = require('./routes/deleteItem');

// Enable CORS
app.use(cors()); 

// Connect to MongoDB
mongoose.connect('mongodb://mongodb:27017/todolist', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Define the Todo model in a separate file (models/Todo.js) and import it
const Todo = require('./models/Todo');

// Middleware to parse JSON bodies
app.use(express.json());

// Define your routes
app.get('/api/greeting', getGreeting);
app.get('/api/items', getItems);
app.post('/api/items', addItem);
app.put('/api/items/:id', updateItem);
app.delete('/api/items/:id', deleteItem);

// Graceful shutdown
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown); // Sent by nodemon

function gracefulShutdown() {
    mongoose.connection.close(() => {
        console.log('MongoDB connection closed due to app termination');
        process.exit(0);
    });
}

// Start the server
app.listen(5000, () => {
    console.log('Backend is running on port 5000');
});  
