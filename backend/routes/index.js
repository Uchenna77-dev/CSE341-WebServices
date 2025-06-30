const routes = require('express').Router()
const indexController = require('../controllers/index');
 
routes.get('/', (indexController.indexRoute));


module.exports = routes