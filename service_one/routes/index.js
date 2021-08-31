const express = require('express');
const routes = express.Router();

// local imports

const controller = require('../controller');


routes.post('/communicate', controller.communicate);
// webhook api
routes.post('/webhook/communicate', controller.webhook);


module.exports = routes;