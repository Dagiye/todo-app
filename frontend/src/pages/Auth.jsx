import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthPage({ mode = 'login', onAuthenticate }) {
  const [isLogin, setIsLogin] = useState(mode !== 'signup');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setIsLogin(mode !== 'signup');
  }, [mode]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      setMessage('Please enter your email and password.');
      return;
    }

    const displayName = formData.name.trim() || formData.email.split('@')[0];
    onAuthenticate({ name: displayName, email: formData.email.trim() });
    navigate('/todos');
  };

  return (
    <div className="page auth-page">
      <div className="container auth-card">
        <p className="eyebrow">Welcome</p>
        <h1>{isLogin ? 'Log in to your workspace' : 'Create your account'}</h1>
        <p className="subtitle">
          This version uses a simple frontend-only demo experience for your todos.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit">{isLogin ? 'Log in' : 'Sign up'}</button>
        </form>

        {message && <p className="auth-message">{message}</p>}

        <p className="auth-switch">
          {isLogin ? "Need an account?" : 'Already have an account?'}
          <button
            type="button"
            className="link-button"
            onClick={() => {
              setIsLogin((current) => !current);
              setMessage('');
            }}
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;
