// SignUp.js

import React, { useState } from 'react';
import { supabase } from '../client';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  const handleSignUp = async (e) => {
    e.preventDefault();
    const { user, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      alert(error.message);
    } else {
      alert('Sign-up successful! Please check your email to verify your account.');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <label style={{ marginLeft: '10px' }}>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            Show Password
          </label>
        </div>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default SignUp;
