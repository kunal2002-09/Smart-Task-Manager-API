const express = require('express');
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
const { validateTaskCreate, validateTaskUpdate } = require('../middleware/validationMiddleware');

const router = express.Router();

router.use(protect);

router.route('/').post(validateTaskCreate, createTask).get(getTasks);
router.route('/:id').get(getTaskById).put(validateTaskUpdate, updateTask).delete(deleteTask);

module.exports = router;
