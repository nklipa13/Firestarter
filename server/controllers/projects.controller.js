const mongoose = require('mongoose');

const Project = mongoose.model('Project');

require('../models/projects.model');

module.exports.addProject = async (req, res) => {
    try {
        const project = new Project(req.body);

        await project.save();

        res.status(200).send({status: 'CREATED'});
        
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