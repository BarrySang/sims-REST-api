const express = require('express');
const router = express.Router();
const statusesController = require('../controllers/statuses');

router.get('/', statusesController.getStatuses);
// router.post('/', statusesController.createStatus);
// router.delete('/:student_id', statusesController.deleteStatus);
// router.put('/:student_id', statusesController.updateStatus);

module.exports = router;
