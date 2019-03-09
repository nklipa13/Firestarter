const mongoose = require('mongoose');

const logsSchema = require('./logs.model');
const faqSchema = require('./faq.model');

const projectSchema = new mongoose.Schema({
    name: {type: String, required: true},
    projectId: {type: Number, required: true, unique : true},
    creator: {type: String, required: true},
    aboutCreator: {type: String},
    aboutProject: {type: String},
    description: {type: String, required: true},
    imageUrl: {type: String},
    date: {type: Date, default: Date.now, required: true},
    numSupporters: {type: Number, default: '0'},
    ethCollected: {type: String, default: '0'},
    oneTimePaymentAmount: {type: Number, default: 0},
    lockedInVesting: {type: Number, default: 0},
    earnedInVesting: {type: String, default: '0'}, // contract info
    lockedInCompound: {type: Number, default: 0},
    earnedInCompund: {type: String, default: '0'}, // contract info
    logs: [logsSchema],
    faq: [faqSchema],
});

mongoose.model('Project', projectSchema);