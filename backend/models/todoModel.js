const { pool } = require('../config/db');

async function getAllTodos() {
  const result = await pool.query(
    'SELECT id, title, completed, created_at FROM todos ORDER BY created_at DESC'
  );
  return result.rows;
}

async function getTodoById(id) {
  const result = await pool.query(
    'SELECT id, title, completed, created_at FROM todos WHERE id = $1',
    [id]
  );
  return result.rows[0];
}

async function createTodo(title) {
  const result = await pool.query(
    'INSERT INTO todos (title, completed) VALUES ($1, false) RETURNING id, title, completed, created_at',
    [title]
  );
  return result.rows[0];
}

async function updateTodo(id, title, completed) {
  const result = await pool.query(
    'UPDATE todos SET title = $2, completed = $3 WHERE id = $1 RETURNING id, title, completed, created_at',
    [id, title, completed]
  );
  return result.rows[0];
}

async function deleteTodo(id) {
  const result = await pool.query('DELETE FROM todos WHERE id = $1 RETURNING id', [id]);
  return result.rows[0];
}

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
