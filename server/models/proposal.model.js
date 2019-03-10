const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema({
    title: {type: String},
    description: {type: String},
    proposalId: {type: String, required: true, unique: true},
    ethAmount: {type: Number},
    daiAmount: {type: Number}
});

mongoose.model('Proposal', proposalSchema);