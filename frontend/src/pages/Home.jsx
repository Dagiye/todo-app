import { useState } from 'react';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';

function Home({ todos, loading, error, onAddTodo, onUpdateTodo, onDeleteTodo, onToggleComplete, onRetry, user, onLogout }) {
  const [title, setTitle] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim()) return;
    onAddTodo(title);
    setTitle('');
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditingTitle(todo.title);
  };

  const saveEdit = (todo) => {
    if (!editingTitle.trim()) return;
    onUpdateTodo(todo.id, editingTitle, todo.completed);
    setEditingId(null);
    setEditingTitle('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingTitle('');
  };

  return (
    <div className="page">
      <div className="container">
        <header className="hero hero-header">
          <div className="hero-copy">
            <p className="eyebrow">Productivity</p>
            <h1>Todo Manager</h1>
            <p className="subtitle">Welcome back, {user?.name || 'friend'} — keep your tasks organized with a simple and calm workspace.</p>
          </div>
          <button type="button" className="ghost-button" onClick={onLogout}>Log out</button>
        </header>

        <TodoForm title={title} setTitle={setTitle} onSubmit={handleSubmit} />

        {error && (
          <div className="alert">
            <span>{error}</span>
            <button onClick={onRetry}>Retry</button>
          </div>
        )}

        {loading ? (
          <div className="status">Loading todos...</div>
        ) : todos.length === 0 ? (
          <div className="empty-state">
            <h2>No todos yet</h2>
            <p>Add your first task to get started.</p>
          </div>
        ) : (
          <TodoList
            todos={todos}
            editingId={editingId}
            editingTitle={editingTitle}
            setEditingTitle={setEditingTitle}
            onStartEdit={startEdit}
            onSaveEdit={saveEdit}
            onCancelEdit={cancelEdit}
            onDeleteTodo={onDeleteTodo}
            onToggleComplete={onToggleComplete}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
