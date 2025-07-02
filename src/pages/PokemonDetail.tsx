import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'; // 👈 Import de la Navbar

interface Pokemon {
  id: number;
  name: string;
  type: string;
  image: string;
  description: string;
}

const PokemonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    const baseList: Pokemon[] = JSON.parse(localStorage.getItem('basePokemons') || '[]');
    const customList: Pokemon[] = JSON.parse(localStorage.getItem('customPokemons') || '[]');
    const all: Pokemon[] = [...baseList, ...customList];

    const poke = all.find((p: Pokemon) => p.id === Number(id));
    setPokemon(poke || null);

    const editable = customList.some((p: Pokemon) => p.id === Number(id));
    setIsEditable(editable);
  }, [id]);

  const handleDelete = () => {
    if (!pokemon) return;
    const customList: Pokemon[] = JSON.parse(localStorage.getItem('customPokemons') || '[]');
    const updatedList = customList.filter((p) => p.id !== pokemon.id);
    localStorage.setItem('customPokemons', JSON.stringify(updatedList));
    navigate('/pokemon');
  };

  if (!pokemon) return <p>Pokémon introuvable.</p>;

  return (
    <div>
      <Navbar /> {/* 👈 Navbar affichée en haut */}
      <div className="container">
        <h1>Détail de {pokemon.name}</h1>
        <img src={pokemon.image} alt={pokemon.name} width={200} />
        <p><strong>Type :</strong> {pokemon.type}</p>
        <p><strong>Description :</strong> {pokemon.description}</p>

        {isEditable && (
          <button onClick={handleDelete}>Supprimer</button>
        )}
      </div>
    </div>
  );
};

export default PokemonDetail;
