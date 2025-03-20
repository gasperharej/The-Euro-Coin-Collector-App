// src/AuthModal.jsx
"use client"

import React, { useState } from "react";
import { auth } from "./firebase";
import "./AuthModal.css";

const AuthModal = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState("login"); // "login" ali "register"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Prosimo, izpolnite vsa polja.");
      return;
    }
    try {
      await auth.signInWithEmailAndPassword(email, password);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password || !confirmPassword) {
      setError("Prosimo, izpolnite vsa polja.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Gesli se ne ujemata.");
      return;
    }
    if (password.length < 6) {
      setError("Geslo mora biti vsaj 6 znakov dolgo.");
      return;
    }
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{mode === "login" ? "Prijava" : "Registracija"}</h2>
        {error && <p className="error-message">{error}</p>}
        {mode === "login" ? (
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Geslo:</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="submit-button">Prijava</button>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label>Email:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Geslo:</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Potrdi geslo:</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
            <button type="submit" className="submit-button">Registracija</button>
          </form>
        )}
        <div className="auth-toggle">
          {mode === "login" ? (
            <p>
              Nimate računa?{" "}
              <button onClick={() => { setMode("register"); setError(""); }}>
                Registrirajte se
              </button>
            </p>
          ) : (
            <p>
              Že imate račun?{" "}
              <button onClick={() => { setMode("login"); setError(""); }}>
                Prijavite se
              </button>
            </p>
          )}
        </div>
        <button className="close-button" onClick={onClose}>
          Zapri
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
