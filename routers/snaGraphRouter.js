const {Router} = require('express');
const snaGraphController = require('../controllers/snaGraphController');

const snaGraphRouter = new Router();

snaGraphRouter.get('/get/:id', snaGraphController.getSnaGraph);
snaGraphRouter.post('/create', snaGraphController.createGraph);
snaGraphRouter.get('/get/:collection_id/name/:experiment_name', snaGraphController.getCSV)


module.exports ={snaGraphRouter};
