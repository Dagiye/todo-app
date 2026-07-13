import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home';
import AuthPage from './pages/Auth';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
});

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const { data } = await apiClient.get('/todos');
      setTodos(data);
      setError('');
    } catch (err) {
  console.error(err);
  setError('Unable to load todos right now.');
} finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (title) => {
    try {
      const { data } = await apiClient.post('/todos', { title });
      setTodos([data, ...todos]);
      setError('');
    } catch (err) {
  console.error(err);
  setError('Unable to add todo.');
}
  };

  const updateTodo = async (id, title, completed) => {
    try {
      const { data } = await apiClient.put(`/todos/${id}`, { title, completed });
      setTodos((currentTodos) =>
        currentTodos.map((todo) => (todo.id === id ? data : todo))
      );
      setError('');
    } catch (err) {
  console.error(err);
  setError('Unable to update todo.');
}
  };

  const removeTodo = async (id) => {
    try {
      await apiClient.delete(`/todos/${id}`);
      setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
      setError('');
    } catch (err) {
  console.error(err);
  setError('Unable to delete todo.');
}
  };

  const toggleComplete = async (todo) => {
    await updateTodo(todo.id, todo.title, !todo.completed);
  };

  const handleAuthenticate = (userData) => {
    setUser(userData);
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to={user ? '/todos' : '/login'} replace />} />
      <Route path="/login" element={<AuthPage mode="login" onAuthenticate={handleAuthenticate} />} />
      <Route path="/signup" element={<AuthPage mode="signup" onAuthenticate={handleAuthenticate} />} />
      <Route
        path="/todos"
        element={
          user ? (
            <Home
              todos={todos}
              loading={loading}
              error={error}
              onAddTodo={addTodo}
              onUpdateTodo={updateTodo}
              onDeleteTodo={removeTodo}
              onToggleComplete={toggleComplete}
              onRetry={fetchTodos}
              user={user}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}

export default App;
