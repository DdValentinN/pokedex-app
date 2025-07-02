import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'; // 👈 Ajout de la Navbar

interface Pokemon {
  id: number;
  name: string;
  type: string;
  image: string;
  isFavorite?: boolean;
}

const basePokemons: Pokemon[] = [
  { id: 1, name: 'Pikachu', type: 'Électrique', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/025.png' },
  { id: 2, name: 'Bulbizarre', type: 'Plante', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png' },
  { id: 3, name: 'Salamèche', type: 'Feu', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/004.png' },
  { id: 4, name: 'Carapuce', type: 'Eau', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png' },
  { id: 5, name: 'Rondoudou', type: 'Fée', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/039.png' },
  { id: 6, name: 'Miaouss', type: 'Normal', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/052.png' },
  { id: 7, name: 'Psykokwak', type: 'Eau', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/054.png' },
  { id: 8, name: 'Nosferapti', type: 'Poison', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/041.png' },
  { id: 9, name: 'Goupix', type: 'Feu', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/037.png' },
  { id: 10, name: 'Abra', type: 'Psy', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/063.png' },
];

const PokemonList: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>(basePokemons);
  const [searchName, setSearchName] = useState('');
  const [searchType, setSearchType] = useState('');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const custom = JSON.parse(localStorage.getItem('customPokemons') || '[]');
    if (custom.length > 0) {
      setPokemons(prev => [...prev, ...custom]);
    }
  }, []);

  const filtered = pokemons.filter(p =>
    p.name.toLowerCase().includes(searchName.toLowerCase()) &&
    p.type.toLowerCase().includes(searchType.toLowerCase()) &&
    (!onlyFavorites || p.isFavorite)
  );

  const pageCount = limit === -1 ? 1 : Math.ceil(filtered.length / limit);
  const startIndex = limit === -1 ? 0 : (page - 1) * limit;
  const paginated = limit === -1 ? filtered : filtered.slice(startIndex, startIndex + limit);

  const toggleFavorite = (id: number) => {
    setPokemons(prev =>
      prev.map(p => p.id === id ? { ...p, isFavorite: !p.isFavorite } : p)
    );
  };

  const deletePokemon = (id: number) => {
    const updated = pokemons.filter(p => p.id !== id);
    setPokemons(updated);

    const custom = JSON.parse(localStorage.getItem('customPokemons') || '[]');
    const filteredCustom = custom.filter((p: Pokemon) => p.id !== id);
    localStorage.setItem('customPokemons', JSON.stringify(filteredCustom));
  };

  return (
    <div>
      <Navbar /> {/* 👈 Intégration ici */}
      <h1>Liste des Pokémon</h1>

      <div>
        <input
          placeholder="Nom..."
          value={searchName}
          onChange={e => setSearchName(e.target.value)}
        />
        <input
          placeholder="Type..."
          value={searchType}
          onChange={e => setSearchType(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={onlyFavorites}
            onChange={e => setOnlyFavorites(e.target.checked)}
          />
          Favoris seulement
        </label>
        <select value={limit} onChange={e => setLimit(Number(e.target.value))}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={-1}>Tous</option>
        </select>
        <Link to="/pokemon/add">
          <button>➕ Ajouter</button>
        </Link>
      </div>

      <ul>
        {paginated.map(p => (
          <li key={p.id}>
            <img src={p.image} alt={p.name} width="80" />
            <strong>{p.name}</strong> (#{p.id}) - {p.type} {' '}
            <button onClick={() => toggleFavorite(p.id)}>
              {p.isFavorite ? '★' : '☆'}
            </button>
            <button onClick={() => deletePokemon(p.id)}>🗑️</button>
          </li>
        ))}
      </ul>

      {limit !== -1 && (
        <div>
          <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>Précédent</button>
          <span> Page {page} / {pageCount} </span>
          <button onClick={() => setPage(p => p + 1)} disabled={page === pageCount}>Suivant</button>
        </div>
      )}
    </div>
  );
};

export default PokemonList;
