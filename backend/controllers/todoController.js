const todoModel = require('../models/todoModel');

async function getTodos(req, res) {
  try {
    const todos = await todoModel.getAllTodos();
    res.status(200).json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ message: 'Failed to fetch todos.' });
  }
}

async function getTodoById(req, res) {
  try {
    const todo = await todoModel.getTodoById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found.' });
    }
    res.status(200).json(todo);
  } catch (error) {
    console.error('Error fetching todo:', error);
    res.status(500).json({ message: 'Failed to fetch todo.' });
  }
}

async function createTodo(req, res) {
  try {
    const { title } = req.body;

    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ message: 'Title is required.' });
    }

    const newTodo = await todoModel.createTodo(title.trim());
    res.status(201).json(newTodo);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ message: 'Failed to create todo.' });
  }
}

async function updateTodo(req, res) {
  try {
    const { title, completed } = req.body;
    const { id } = req.params;

    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ message: 'Title is required.' });
    }

    if (typeof completed !== 'boolean') {
      return res.status(400).json({ message: 'Completed must be a boolean.' });
    }

    const updatedTodo = await todoModel.updateTodo(id, title.trim(), completed);
    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found.' });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ message: 'Failed to update todo.' });
  }
}

async function deleteTodo(req, res) {
  try {
    const deletedTodo = await todoModel.deleteTodo(req.params.id);
    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found.' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ message: 'Failed to delete todo.' });
  }
}

module.exports = {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
