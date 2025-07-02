// src/components/Navbar.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/login');
  };

  return (
    <nav style={{ background: '#e63946', padding: '1rem', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <Link to="/" style={{ marginRight: '1rem', color: 'white' }}>Accueil</Link>
        <Link to="/pokemon" style={{ marginRight: '1rem', color: 'white' }}>Liste</Link>
        <Link to="/pokemon/add" style={{ marginRight: '1rem', color: 'white' }}>Ajouter</Link>
      </div>
      <button onClick={handleLogout} style={{ background: '#fff', color: '#e63946', padding: '0.5rem 1rem', borderRadius: '5px', border: 'none' }}>
        Se déconnecter
      </button>
    </nav>
  );
};

export default Navbar;
