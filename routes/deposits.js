const express = require('express');
const router = express.Router();
const depositsController = require('../controllers/deposits');

// router.get('/', depositsController.getDeposits);
router.post('/', depositsController.createDeposit);
// router.delete('/:id', depositsController.deleteDeposit);
// router.put('/:id', depositsController.updateDeposit);

module.exports = router;