import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import PokemonList from './pages/PokemonList'
import AddPokemon from './pages/AddPokemon'
import PokemonDetail from './pages/PokemonDetail'

const App: React.FC = () => {
  const isAuth = localStorage.getItem('auth') === 'true'

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={isAuth ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/pokemon" element={isAuth ? <PokemonList /> : <Navigate to="/login" />} />
        <Route path="/pokemon/add" element={isAuth ? <AddPokemon /> : <Navigate to="/login" />} />
        <Route path="/pokemon/:id" element={isAuth ? <PokemonDetail /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
