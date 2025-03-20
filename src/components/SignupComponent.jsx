// src/components/SignupComponent.jsx
import React, { useState } from 'react';
import { auth } from '../firebase';

const SignupComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignup = async () => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      // Po uspešni registraciji preusmerite uporabnika ali pokažite sporočilo
    } catch (err) {
      setError(err.message);
      console.error("Registracija ni uspela:", err);
    }
  };

  return (
    <div>
      <h2>Registration</h2>
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
      <button onClick={handleSignup}>Registration</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default SignupComponent;
