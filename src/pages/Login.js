import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/login.css';

function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Test credentials for user convenience
  const testCredentials = [
    { username: 'mor_2314', password: '83r5^_' },
    { username: 'johnd', password: 'm38rmF$' },
    { username: 'kevinryan', password: 'kev02937@' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('https://fakestoreapi.com/auth/login', {
        username: credentials.username,
        password: credentials.password
      });
      
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (err) {
      setError('Invalid username or password. Please try again.');
      setLoading(false);
    }
  };

  const handleTestCredential = (cred) => {
    setCredentials({
      username: cred.username,
      password: cred.password
    });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back!</h2>
          <p>Please login to your account</p>
        </div>

        {error && (
          <div className="error-message">
            <span className="error-icon">!</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                placeholder="Enter password"
                required
              />
              <button 
                type="button" 
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? (
              <span className="spinner"></span>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="test-credentials">
          <h4>Demo Credentials:</h4>
          <div className="credential-buttons">
            {testCredentials.map((cred, index) => (
              <button
                key={index}
                type="button"
                className="test-button"
                onClick={() => handleTestCredential(cred)}
              >
                Use {cred.username}
              </button>
            ))}
          </div>
        </div>

        <div className="login-footer">
          <p>Don't have an account? <span>Contact admin</span></p>
        </div>
      </div>
    </div>
  );
}

export default Login;