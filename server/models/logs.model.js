const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: Date, default: Date.now, required: true},
});

mongoose.model('Log', logSchema);