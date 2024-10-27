import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import { handleError, handleSuccess } from '../utils';
import { useSelector, useDispatch } from 'react-redux';
// import { increment, decrement } from '../redux/counter/CounterSlice';

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });

 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      // return handleError('Email and password are required');
      console.log("Email password are required")
    }
    try {
      const url = `http://localhost:5000/login/verify`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      });
      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;
      if (success) {
        // handleSuccess(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', JSON.stringify({ name }));
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else if (error) {
        const details = error?.details[0]?.message;
        // handleError(details);
      } else if (!success) {
        // handleError(message);
      }
    } catch (err) {
      // handleError(err);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleLogin} className="needs-validation" noValidate>
        <div className="form-group mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter your email..."
            value={loginInfo.email}
            required
          />
          <div className="invalid-feedback">Please enter a valid email.</div>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter your password..."
            value={loginInfo.password}
            required
          />
          <div className="invalid-feedback">Password is required.</div>
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
        <p className="text-center mt-3">
          Don't have an account? <Link to="/">Sign up</Link>
        </p>
      </form>
     
    </div>
  );
}

export default Login;
