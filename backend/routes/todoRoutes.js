const express = require('express');
const todoController = require('../config/controllers/todoController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.use(authenticateToken);
router.get('/', todoController.getTodos);
router.get('/:id', todoController.getTodoById);
router.post('/', todoController.createTodo);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
