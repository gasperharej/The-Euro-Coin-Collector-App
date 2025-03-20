// src/Header.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthModal from "./AuthModal";
import { auth } from "./firebase";
import "./Header.css";

const Header = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Gumb za prijavo/registracijo / odjavo
  const handleAuthButtonClick = () => {
    if (currentUser) {
      auth.signOut();
    } else {
      setShowAuthModal(true);
    }
  };

  // Gumb za "My Collection"
  const handleMyCollectionClick = () => {
    if (currentUser) {
      navigate("/mycollection");
    } else {
      setShowAuthModal(true);
    }
  };

  // Gumb za "Home"
  const handleHomeClick = () => {
    navigate("/");
  };

  const closeModal = () => setShowAuthModal(false);

  return (
    <header className="header">
      <div className="header-left">
        <button className="nav-button" onClick={handleHomeClick}>Home</button>
        <button className="nav-button" onClick={handleMyCollectionClick}>My Collection</button>
      </div>
      <div className="header-center">
        <h1>The Euro Coin Collector</h1>
      </div>
      <div className="header-right">
        <button className="auth-button" onClick={handleAuthButtonClick}>
          {currentUser ? "Logout" : "Login / Registration"} 
        </button>
      </div>
      <AuthModal isOpen={showAuthModal} onClose={closeModal} />
    </header>
  );
};

export default Header;

