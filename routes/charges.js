const express = require('express');
const router = express.Router();
const chargesController = require('../controllers/charges');

// router.get('/', chargesController.getCharges);
router.post('/', chargesController.createCharge);
// router.delete('/:structure_id/:student_id', chargesController.deleteCharge);
// router.put('/:structure_id/:student_id', chargesController.updateCharge);

module.exports = router;
