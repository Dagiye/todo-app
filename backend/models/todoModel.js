const { pool } = require('../config/db');

async function getAllTodos(userId) {
  const result = await pool.query(
    'SELECT id, title, completed, created_at FROM todos WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  );
  return result.rows;
}

async function getTodoById(id, userId) {
  const result = await pool.query(
    'SELECT id, title, completed, created_at FROM todos WHERE id = $1 AND user_id = $2',
    [id, userId]
  );
  return result.rows[0];
}

async function createTodo(title, userId) {
  const result = await pool.query(
    'INSERT INTO todos (title, completed, user_id) VALUES ($1, false, $2) RETURNING id, title, completed, created_at',
    [title, userId]
  );
  return result.rows[0];
}

async function updateTodo(id, title, completed, userId) {
  const result = await pool.query(
    'UPDATE todos SET title = $2, completed = $3 WHERE id = $1 AND user_id = $4 RETURNING id, title, completed, created_at',
    [id, title, completed, userId]
  );
  return result.rows[0];
}

async function deleteTodo(id, userId) {
  const result = await pool.query('DELETE FROM todos WHERE id = $1 AND user_id = $2 RETURNING id', [id, userId]);
  return result.rows[0];
}

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
