import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AuthPages.css';

function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'customer'
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      setError('Please fill in all fields');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    // TODO: connect to Spring Boot API
    console.log('Signing up with', formData);
    navigate('/');
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
          <h2 className="auth-title">Create account</h2>
          <p className="auth-subtitle">Sign up to get started with Customs</p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSignup} className="auth-form">

            <div className="form-group">
              <label>Full name</label>
              <input
                type="text"
                name="name"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

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
              <label>Phone number</label>
              <input
                type="tel"
                name="phone"
                placeholder="+91 00000 00000"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>I am a</label>
              <div className="role-toggle">
                <button
                  type="button"
                  className={formData.role === 'customer' ? 'role-btn active' : 'role-btn'}
                  onClick={() => setFormData({ ...formData, role: 'customer' })}
                >
                  Customer
                </button>
                <button
                  type="button"
                  className={formData.role === 'tailor' ? 'role-btn active' : 'role-btn'}
                  onClick={() => setFormData({ ...formData, role: 'tailor' })}
                >
                  Tailor
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Confirm password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Repeat your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn-primary">
              Create account
            </button>
          </form>

          <div className="auth-divider"><span>or</span></div>

          <p className="auth-switch">
            Already have an account?{' '}
            <Link to="/">Log in</Link>
          </p>
        </div>
      </div>

    </div>
  );
}

export default SignupPage;