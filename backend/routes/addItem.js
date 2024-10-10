// routes/addItem.js
const Todo = require('../models/Todo');

module.exports = async (req, res) => {
    const { text } = req.body;

    // Kiểm tra xem dữ liệu text có được gửi lên hay không
    if (!text || typeof text !== 'string') {
        return res.status(400).json({ message: 'Invalid input: text is required and should be a string.' });
    }

    // Tạo đối tượng Todo mới
    const newItem = new Todo({
        text: text.trim(),
    });

    try {
        // Lưu đối tượng mới vào MongoDB
        const savedItem = await newItem.save();
        res.status(201).json(savedItem); // Trả về kết quả thành công
    } catch (error) {
        console.error('Error adding item:', error); // Log lỗi ra console để kiểm tra
        res.status(500).json({ message: 'Error adding item to the database.' });
    }
};
