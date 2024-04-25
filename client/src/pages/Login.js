//file name: Login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate/ history
  const [showPassword, setShowPassword] = useState(false); // State to track whether password is visible



  const handleLogin = async (e) => {
    e.preventDefault();
    const { user, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert(error.message);
    } else {
      alert('Logged in successfully!');
      navigate('/'); // Navigate to the homepage

    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the value of showPassword
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input 
          type={showPassword ? 'text' : 'password'} // Toggle between text and password type
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
        />
        <button type="button" onClick={togglePasswordVisibility}>
          {showPassword ? 'Hide Password' : 'Show Password'}
        </button>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
  );
}

export default Login;
