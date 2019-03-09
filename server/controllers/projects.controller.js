const mongoose = require('mongoose');

const Project = mongoose.model('Project');

const signature = require('../services/signature');

const web3 = require('web3');

require('../models/projects.model');

module.exports.addProject = async (req, res) => {
    try {
        const project = new Project(req.body);

        await project.save();

        res.status(200).send({status: 'OK', id: project._id});
        
    } catch(err) {
        console.log(err);
    }
};

module.exports.getProject = async (req, res) => {
    try {
        const id = req.params.projectId;

        console.log(id);

        const project = await Project.find({_id: id});

        res.status(200);
        res.json(project);
        
    } catch(err) {
        console.log(err);
    }
};

module.exports.listProjects = async (req, res) => {
    try {
        const projects = await Project.find({});

        console.log(projects);

        res.status(200);
        res.json(projects);
        
    } catch(err) {
        console.log(err);
    }
};

module.exports.updateProjectFunds = async (req, res) => {
    try {
        let project = await Project.findById(req.params.projectId).exec();

        // action = 'add'|'remove' u zavisnosti da li zoves kad korisnik funduje ili sklanja funding
        // type = 1 -> direktno placanje | 2 -> vesting | 3 -> compound
        // amount = 1 -> koliko ether je uplatio | 2 -> koliko ethera je ubacio/izvadio | 
        // 3 -> koliko ethera je ubacio/izvadio
        const { type, action, amount } = req.params;

        const numAmount = web3.utils.toBN(amount);
        const numValue = web3.utils.toBN(project[getParamName(type)]);

        if (action === 'add') {
            project[getParamName(type)] = (numAmount.add(numValue)).toString();
        } else if (action === 'remove') {
            project[getParamName(type)] = (numAmount.sub(numValue)).toString();
        }

        await project.save();

        res.status(200);
        res.json({status: 'OK'});
        
    } catch(err) {
        console.log(err);
    }
};

module.exports.addProjectLog = async (req, res) => {
    try {
        const { address, sig, msg } = req.params;

        if (!onlyWithSig(address, sig, msg )) {
            res.status(403);
            res.json({status: 'ERROR', description: 'Invalid signature'});
        }

        let project = await Project.findById(req.params.projectId).exec();

        if(!project.logs) {
            project.logs = [];
        }

        project.logs.push({
            title: req.body.title,
            description: req.body.description
        });

        await project.save();

        res.status(200);
        res.json({status: 'OK'});
        
    } catch(err) {
        console.log(err);
    }
};

module.exports.getProjectLogs = async (req, res) => {
    try {
        const id = req.params.projectId;

        const project = await Project.find({_id: id});

        res.status(200);
        res.json(project.logs);
        
    } catch(err) {
        console.log(err);
    }
};


module.exports.addProjectFaq = async (req, res) => {
    try {
        const { address, sig, msg } = req.params;

        if (!onlyWithSig(address, sig, msg)) {
            res.status(403);
            res.json({status: 'ERROR', description: 'Invalid signature'});
        }

        let project = await Project.findById(req.params.projectId).exec();

        if(!project.faq) {
            project.faq = [];
        }

        console.log(project.faq);

        project.faq.push({
            question: req.body.question,
            answer: req.body.answer
        });

        await project.save();

        res.status(200);
        res.json({status: 'OK'});
        
    } catch(err) {
        console.log(err);
    }
};


// Helper functions

function onlyWithSig(address, sig, msg) {
    return signature.isValidSignature(address, sig, msg);
}

function getParamName(type) {
    if (type === 1) {
        return 'oneTimePaymentAmount';
    } else if (type === 2) {
        return 'lockedInVesting';
    } else if (type === 3) {
        return 'lockedInCompund';
    }
}