const router = require('express').Router();

require('./models/projects.model');
const projectsCtrl = require('./controllers/projects.controller');

router.post('/project', (req, res) => { projectsCtrl.addProject(req, res); });
router.get('/project', (req, res) => { projectsCtrl.listProjects(req, res); });
router.get('/project/:id', (req, res) => { projectsCtrl.getProject(req, res); });

router.post('/project/log', (req, res) => { projectsCtrl.addProjectLog(req, res); });
router.get('/project/log', (req, res) => { projectsCtrl.addProjectLog(req, res); });


module.exports = router;