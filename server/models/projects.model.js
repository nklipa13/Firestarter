const mongoose = require('mongoose');

const logsSchema = require('./logs.model');
const faqSchema = require('./faq.model');

const projectSchema = new mongoose.Schema({
    title: {type: String, required: true},
    creator: {type: String, required: true},
    about: {type: String},
    bio: {type: String},
    description: {type: String, required: true},
    date: {type: Date, default: Date.now, required: true},
    numSupporters: {type: Number},
    ethCollected: {type: Number},
    logs: [logsSchema],
    faq: [faqSchema],
});

mongoose.model('Project', projectSchema);