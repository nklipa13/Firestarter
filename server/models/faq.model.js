const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
    question: {type: String, required: true},
    answer: {type: String, required: true},
});

mongoose.model('Comment', faqSchema);