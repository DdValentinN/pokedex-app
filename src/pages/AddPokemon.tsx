import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'; // 👈 Ajout de la Navbar

const AddPokemon: React.FC = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const customPokemons = JSON.parse(localStorage.getItem('customPokemons') || '[]');
    const basePokemons = JSON.parse(localStorage.getItem('basePokemons') || '[]');
    const all = [...basePokemons, ...customPokemons];

    const newPokemon = {
      id: Date.now(),
      name,
      type,
      description,
      image,
    };

    const updatedList = [...customPokemons, newPokemon];
    localStorage.setItem('customPokemons', JSON.stringify(updatedList));
    navigate('/pokemon');
  };

  return (
    <div>
      <Navbar /> {/* 👈 Affichage de la navbar */}
      <div className="container">
        <h1>Ajouter un Pokémon</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nom :</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label>Type :</label>
            <input type="text" value={type} onChange={(e) => setType(e.target.value)} required />
          </div>
          <div>
            <label>Description :</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <div>
            <label>Image (URL) :</label>
            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
          </div>
          <button type="submit">Ajouter</button>
        </form>
      </div>
    </div>
  );
};

export default AddPokemon;
