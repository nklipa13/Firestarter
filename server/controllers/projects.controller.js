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
        res.status(500).send({ error: { messsage: err } } );
    }
};

module.exports.getProject = async (req, res) => {
    try {
        const id = req.params.projectId;

        console.log(id);

        const project = await Project.find({projectId: id});

        res.status(200);
        res.json(project);
        
    } catch(err) {
        console.log(err);
        res.status(500).send({ error: { messsage: err } } );
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
        res.status(500).send({ error: { messsage: err } } );
    }
};

module.exports.updateProjectFunds = async (req, res) => {
    try {
        let project = await Project.findOne({projectId: req.params.projectId}).exec();

        // action = 'add'|'remove' u zavisnosti da li zoves kad korisnik funduje ili sklanja funding
        // type = 1 -> direktno placanje | 2 -> vesting | 3 -> compound
        // amount = 1 -> koliko ether je uplatio | 2 -> koliko ethera je ubacio/izvadio | 
        // 3 -> koliko ethera je ubacio/izvadio
        const { type, action, amount, account } = req.body;

        const numAmount = parseFloat(amount);

        if (action === 'add') {
            project[getParamName(type)] += numAmount;

            if (type !== 3) {
                project.ethCollected += numAmount;
            } else {
                project.daiCollected += numAmount;
            }
        } else if (action === 'remove') {
            project[getParamName(type)] -= numAmount;
            project.numSupporters--;
        }

        project.supportersAddresses.indexOf(account) === -1 ? project.supportersAddresses.push(account) : null;

        project.numSupporters = project.supportersAddresses.length;

        await project.save();

        res.status(200);
        res.json(project);
        
    } catch(err) {
        console.log(err);
        res.status(500).send({ error: { messsage: err } } );
    }
};

module.exports.addProjectLog = async (req, res) => {
    try {
        const { address, sig, msg } = req.body;

        if (!onlyWithSig(address, sig, msg )) {
            res.status(500).send({ error: { messsage: "Invalid siganture" } } );
        }

        let project = await Project.findOne({projectId: req.params.projectId}).exec();

        if(!project.logs) {
            project.logs = [];
        }

        project.logs.push({
            versionNumber: req.body.versionNumber,
            date: req.body.versionDate,
            description: req.body.description,
            versionChanges: req.body.versionChanges,
        });

        await project.save();

        res.status(200);
        res.json({status: 'OK'});
        
    } catch(err) {
        console.log(err);
        res.status(500).send({ error: { messsage: err } } );
    }
};

module.exports.getProjectLogs = async (req, res) => {
    try {
        const id = req.params.projectId;

        const project = await Project.findOne({projectId: id}).exec();

        res.status(200);
        res.json(project.logs);
        
    } catch(err) {
        console.log(err);
        res.status(500).send({ error: { messsage: err } } );
    }
};


module.exports.addProjectFaq = async (req, res) => {
    try {
        const { address, sig, msg } = req.body;

        console.log(address, sig, msg);

        if (!onlyWithSig(address, sig, msg)) {
            res.status(500).send({ error: { messsage: "Invalid siganture" } } );
        }

        let project = await Project.findOne({projectId: req.params.projectId}).exec();

        if(!project.faq) {
            project.faq = [];
        }

        project.faq.push({
            question: req.body.question,
            answer: req.body.answer
        });

        await project.save();

        res.status(200);
        res.json(project);
        
    } catch(err) {
        console.log(err);
        res.status(500).send({ error: { messsage: err } } );
    }
};


// Helper functions

function onlyWithSig(address, sig, msg) {
    return true;
    // return signature.isValidSignature(address, sig, msg);
}

function getParamName(type) {
    if (type === 1) {
        return 'oneTimePaymentAmount';
    } else if (type === 2) {
        return 'lockedInVesting';
    } else if (type === 3) {
        return 'lockedInCompound';
    }
}