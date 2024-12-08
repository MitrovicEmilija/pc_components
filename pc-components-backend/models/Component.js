const mongoose = require('mongoose');

const componentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true }, 
});

module.exports = mongoose.model('Component', componentSchema);
