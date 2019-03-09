const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    versionNumber: {type: String, required: true},
    description: {type: String, required: true},
    versionChanges: [String],
    date: {type: Date, default: Date.now, required: true},
});

mongoose.model('Log', logSchema);