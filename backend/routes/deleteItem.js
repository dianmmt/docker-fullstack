// routes/deleteItem.js
const Todo = require('../models/Todo');

module.exports = async (req, res) => {
    try {
        const deletedItem = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting item' });
    }
};
