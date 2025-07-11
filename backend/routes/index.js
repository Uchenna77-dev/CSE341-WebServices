const routes = require('express').Router()
const indexController = require('../controllers/index')
const contactController = require('../controllers/contact')
 
routes.get('/', (indexController.indexRoute));

routes.post('/', (indexController.indexRoute));

routes.put('/', (indexController.indexRoute));

routes.delete('/', (indexController.indexRoute));


module.exports = routes