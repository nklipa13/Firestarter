const mongoose = require('mongoose');

const Project = mongoose.model('Project');

const signature = require('../services/signature');

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
        const id = req.params.id;

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


// Helper
function onlyWithSig(address, sig, msg) {
    return signature.isValidSignature(address, sig, msg);
}