import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AuthPages.css';
import axios from 'axios';

function LoginPage() {
  const navigate = useNavigate();
  const[loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }
    
    try{
      setLoading(true);
      const response =  await axios.post(
        'http://localhost:8080/api/auth/login',
        formData,
        {
          headers:{
           'Content-Type' : "application/json"
          }
        }
      );

      console.log(response);
      const data = response.data;
      if(data.success == true){
        localStorage.setItem("user", JSON.stringify(data));
        navigate('/home');
      }else{
        setError(data.message);
      }
    }catch(err){
        if (err.response) 
          {
        setError(err.response.data.message || 'Invalid credentials');
      } else {
        setError('Server not responding');
      }
    } 
    finally {
      setLoading(false);
    }
      

    // // TODO: connect to Spring Boot API
    // console.log('Logging in with', formData);
    // navigate('/home');
  };

  return (
    <div className="auth-container">

      <div className="auth-left">
  <div className="auth-overlay">
  <div className="brand">
  <div className="brand-logo-row">
    <div className="brand-logo">C</div>
    <span className="brand-logo-text">ustoms</span>
  </div>
  <p className="brand-tagline">Design It. Build It. Wear It.</p>
</div>
    <p className="brand-desc">
      Your one-stop platform for made-to-order clothing and footwear.
      Connect with skilled local tailors and get clothes that fit perfectly.
    </p>
  </div>
</div>

      <div className="auth-right">
        <div className="auth-card">
          <h2 className="auth-title">Welcome back</h2>
          <p className="auth-subtitle">Log in to your Customs account</p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleLogin} className="auth-form">
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="form-forgot">
              <Link to="/forgot-password">Forgot password?</Link>
            </div>

            <button type="submit" className="btn-primary">
              Log in
            </button>
          </form>

          <div className="auth-divider"><span>or</span></div>

          <p className="auth-switch">
            Don't have an account?{' '}
            <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>

    </div>
  );
}

export default LoginPage;