// routes/updateItem.js
const Todo = require('../models/Todo');

module.exports = async (req, res) => {
    try {
        const updatedItem = await Todo.findByIdAndUpdate(req.params.id, { text: req.body.text }, { new: true });
        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: 'Error updating item' });
    }
};
