import React, { useState } from "react";
import axios from "axios";
import './App.css';

const App = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setPokemonName(e.target.value.trim().toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      setPokemonData(response.data);
    } catch (err) {
      setError("Pokémon not found. Please try another name or number.");
      setPokemonData(null);
    }
  };

  return (
    <div className="app">
      <h1>Pokédex</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Enter Pokémon name or number" 
          value={pokemonName}
          onChange={handleInputChange} 
        />
        <button type="submit">Search</button>
      </form>

      {error && <p className="error">{error}</p>}

      {pokemonData && (
        <div className="pokemon-info">
          <h2>{pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</h2>
          <img 
            src={pokemonData.sprites.front_default} 
            alt={pokemonData.name}
          />
          <p><strong>Abilities:</strong> {pokemonData.abilities.map(ability => ability.ability.name).join(", ")}</p>
          <p><strong>Types:</strong> {pokemonData.types.map(type => type.type.name).join(", ")}</p>
          <p><strong>Stats:</strong></p>
          <ul className="stats">
            {pokemonData.stats.map(stat => (
              <li key={stat.stat.name}>
                <img src={`https://img.icons8.com/ios/50/000000/statistics.png`} alt={`${stat.stat.name} icon`} className="stat-icon" />
                {stat.stat.name}: {stat.base_stat}
              </li>
            ))}
          </ul>

          <p><strong>Moves:</strong></p>
          <ul className="moves">
            {pokemonData.moves.slice(0, 5).map(move => (
              <li key={move.move.name}>
                <img src={`https://img.icons8.com/ios/50/000000/move.png`} alt={`${move.move.name} icon`} className="move-icon" />
                {move.move.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;