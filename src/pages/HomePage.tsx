// src/pages/HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const HomePage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h1 style={{ color: '#e63946', fontSize: '3rem' }}>Bienvenue dans le Pokédex 🧭</h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '1rem auto' }}>
          Explorez, ajoutez et gérez vos Pokémon favoris comme un véritable dresseur !
          Cette application vous permet de consulter tous vos Pokémon, d’ajouter vos propres créatures,
          et de gérer vos favoris à volonté.
        </p>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
          alt="Pikachu"
          style={{ width: '150px', margin: '1rem auto' }}
        />
        <div style={{ marginTop: '2rem' }}>
          <Link to="/pokemon">
            <button style={{ padding: '1rem 2rem', fontSize: '1rem', background: '#e63946', color: 'white', border: 'none', borderRadius: '5px' }}>
              Accéder à la liste des Pokémon
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
