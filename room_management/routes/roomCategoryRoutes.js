const express = require('express');
const router = express.Router();
const controller = require('../controllers/roomCategoryController');

router.post('/', controller.createRoomCategory);
router.get('/', controller.getAllRoomCategories);
router.get('/:id', controller.getRoomCategoryById);
router.put('/:id', controller.updateRoomCategory);
router.delete('/:id', controller.deleteRoomCategory);

module.exports = router;
