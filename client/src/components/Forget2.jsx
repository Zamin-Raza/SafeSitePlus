import React, { useState } from 'react';
import { Link, useNavigate , useParams } from 'react-router-dom';
import axios from 'axios';

const Forgot2 = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {id,token} = useParams();

  console.log(id + "dsadas" + token);
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`http://localhost:5000/login/PasswordChange/${id}/${token}`, { email });

      console.log("bs qareeb hain");

      
        navigate('/login');
      
   

    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      height: '100vh',
      backgroundImage: "linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))"
    }}>
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '10px',
        width: '40%'
      }}>
        <h2 className='mb-3 text-primary'>RECOVER Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label htmlFor="exampleInputEmail1" className="form-label">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control"
              id="exampleInputEmail1"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
         
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
        <p className='container my-2'>Don&apos;t have an account?</p>
        <Link to='/register' className="btn btn-secondary">Register</Link>
      </div>
    </div>
  );
}

export default Forgot2;
