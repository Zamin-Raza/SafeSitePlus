import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Forgot1 = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        console.log(email);
      const response = await axios.post(`http://localhost:5000/login/forget`, { email });
     
      // Handle success response here (e.g., navigate to another page or show success message)
    } catch (error) {
      console.error('Error during password recovery:', error);
      alert('An error occurred during password recovery.');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        height: '100vh',
        backgroundImage: 'linear-gradient(#00d5ff, #0095ff, rgba(93, 0, 255, .555))'
      }}
    >
      <div
        style={{
          background: 'white',
          padding: '20px',
          borderRadius: '10px',
          width: '40%'
        }}
      >
        <h2 className='mb-3 text-primary'>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label htmlFor="exampleInputEmail1" className="form-label">
              <strong>Email Id</strong>
            </label>
            <input
              type="email"
              placeholder="Enter an Email"
              className="form-control"
              id="exampleInputEmail1"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
             <button type="submit" className="btn btn-secondary">Submit</button>
          </div>
         
        </form>
        <p className='container my-2'>Don't have an account?</p>
        <Link to='/register' className="btn btn-secondary">Register</Link>
      </div>
    </div>
  );
};

export default Forgot1;
