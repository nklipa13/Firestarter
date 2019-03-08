const router = require('express').Router();

require('./models/projects.model');
const projectsCtrl = require('./controllers/projects.controller');

router.post('/project', (req, res) => { projectsCtrl.addProject(req, res); });
router.get('/project', (req, res) => { projectsCtrl.listProjects(req, res); });
router.get('/project/:id', (req, res) => { projectsCtrl.getProject(req, res); });

// Logs
router.post('/project/:projectId/log', (req, res) => { projectsCtrl.addProjectLog(req, res); });
router.get('/project/:projectId/log', (req, res) => { projectsCtrl.getProjectLogs(req, res); });

// FAQ
router.post('/project/:projectId/faq', (req, res) => { projectsCtrl.addProjectFaq(req, res); });


module.exports = router;