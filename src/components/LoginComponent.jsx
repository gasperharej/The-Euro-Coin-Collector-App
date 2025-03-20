// src/components/LoginComponent.jsx
import React, { useState } from 'react';
import { auth } from '../firebase';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      // Po uspešni prijavi lahko preusmerite uporabnika ali prikažete njegovo zbirko
    } catch (err) {
      setError(err.message);
      console.error("Login failed:", err);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input 
        type="email" 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
        placeholder="Email" 
      />
      <input 
        type="password" 
        value={password} 
        onChange={e => setPassword(e.target.value)} 
        placeholder="Password" 
      />
      <button onClick={handleLogin}>Prijava</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LoginComponent;
