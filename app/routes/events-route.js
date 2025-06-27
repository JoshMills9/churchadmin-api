const express = require('express')

const eventsController = require('../controllers/events-controller')

const router = express.Router();

router.get('/:eid',  eventsController.events);

router.post('/:eid', eventsController.createEvent);

router.patch('/:eid', eventsController.updateEvent);

router.delete('/:eid', eventsController.removeEvent)


module.exports = router;