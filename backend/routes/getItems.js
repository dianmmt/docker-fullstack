// routes/getItems.js
const Todo = require('../models/Todo');

module.exports = async (req, res) => {
    try {
        const items = await Todo.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching items' });
    }
};
