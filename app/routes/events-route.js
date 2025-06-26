const express = require('express')

const eventsController = require('../controllers/events-controller')

const router = express.Router();

router.get('/:mid',  eventsController.events);

router.post('/:mid', eventsController.createEvent);

router.patch('/:mid', eventsController.updateEvent);

router.delete('/:mid', eventsController.removeEvent)


module.exports = router;