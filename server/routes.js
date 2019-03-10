const router = require('express').Router();

require('./models/projects.model');
const projectsCtrl = require('./controllers/projects.controller');

router.post('/project', (req, res) => { projectsCtrl.addProject(req, res); });
router.get('/project', (req, res) => { projectsCtrl.listProjects(req, res); });
router.get('/project/:projectId', (req, res) => { projectsCtrl.getProject(req, res); });

// Project updates (when they join or leave)
router.put('/project/:projectId/funds', (req, res) => { projectsCtrl.updateProjectFunds(req, res); });

// Logs
router.post('/project/:projectId/log', (req, res) => { projectsCtrl.addProjectLog(req, res); });
router.get('/project/:projectId/log', (req, res) => { projectsCtrl.getProjectLogs(req, res); });

// Proposals
router.post('/project/:projectId/proposal', (req, res) => { projectsCtrl.addProjectProposal(req, res); });
router.get('/project/:projectId/proposal', (req, res) => { projectsCtrl.getProjectProposals(req, res); });

// FAQ
router.post('/project/:projectId/faq', (req, res) => { projectsCtrl.addProjectFaq(req, res); });


module.exports = router;