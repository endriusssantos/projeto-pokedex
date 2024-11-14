import { createContext, useState } from 'react';

export const PokemonListContext = createContext();

export function PokemonListProvider({ children }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [selectedType, setSelectedType] = useState('all');

  return (
    <PokemonListContext.Provider value={{
      pokemonList,
      setPokemonList,
      offset,
      setOffset,
      selectedType,
      setSelectedType,
    }}>
      {children}
    </PokemonListContext.Provider>
  );
}
