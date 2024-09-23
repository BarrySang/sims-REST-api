const express = require('express');
const router = express.Router();
const structuresController = require('../controllers/structures');

router.get('/', structuresController.getStructures);
// router.post('/', structuresController.createStructure);
// router.delete('/:id', structuresController.deleteStructure);
// router.put('/:id', structuresController.updateStructure);

module.exports = router;
