import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeContext } from '../../contexts/ThemeContext';
import { PokemonListContext } from '../../contexts/PokemonListContext';
import lightIcon from '../../images/moon.png';
import darkIcon from '../../images/sun.png';

function PokemonList() {
  const { pokemonList, setPokemonList, offset, setOffset, selectedType, setSelectedType } = useContext(PokemonListContext);
  const limit = 10;
  const { isDark, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (offset === 0 && pokemonList.length === 0) {
      fetchInitialPokemon();
    }
  }, [offset, pokemonList]);

  async function fetchInitialPokemon() {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
      const pokemonData = response.data.results;

      const pokemonDetails = await Promise.all(
        pokemonData.map(async (pokemon) => {
          const details = await axios.get(pokemon.url);
          return {
            name: pokemon.name,
            image: details.data.sprites.front_default,
            type: details.data.types[0].type.name,
          };
        })
      );

      setPokemonList(pokemonDetails);
    } catch (error) {
      console.error("Erro ao buscar dados dos Pokémon:", error);
    }
  }

  async function fetchMorePokemon() {
    try {
      const newOffset = offset + limit;
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${newOffset}`);
      const pokemonData = response.data.results;

      const pokemonDetails = await Promise.all(
        pokemonData.map(async (pokemon) => {
          const details = await axios.get(pokemon.url);
          return {
            name: pokemon.name,
            image: details.data.sprites.front_default,
            type: details.data.types[0].type.name,
          };
        })
      );

      setPokemonList((prevList) => [...prevList, ...pokemonDetails]);
      setOffset(newOffset);
    } catch (error) {
      console.error("Erro ao buscar dados dos Pokémon:", error);
    }
  }

  function handleTypeChange(event) {
    setSelectedType(event.target.value);
  }

  const filteredPokemonList = selectedType === 'all'
    ? pokemonList
    : pokemonList.filter((pokemon) => pokemon.type === selectedType);

  return (
    <AppContainer>
      <Header>
        <button onClick={toggleTheme}>
          <ThemeImage src={isDark ? darkIcon : lightIcon} alt="theme" />
        </button>
        <a href="/">
          <Image src="../src/images/logo-pokemon.png" alt="logo" />
        </a>
        <Select onChange={handleTypeChange} value={selectedType}>
          <option value="all">All</option>
          <option value="grass">Grass</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="electric">Electric</option>
          <option value="bug">Bug</option>
          <option value="normal">Normal</option>
          <option value="poison">Poison</option>
          <option value="ground">Ground</option>
          <option value="flying">Flying</option>
          <option value="fairy">Fairy</option>
          <option value="fighting">Fighting</option>
          <option value="psychic">Psychic</option>
          <option value="rock">Rock</option>
          <option value="ghost">Ghost</option>
          <option value="ice">Ice</option>
          <option value="dragon">Dragon</option>
          <option value="dark">Dark</option>
          <option value="steel">Steel</option>
        </Select>
      </Header>
      <ListContainer>
        {filteredPokemonList.map((pokemon, index) => (
          <PokemonContainer key={index} type={pokemon.type}>
            <StyledLink to={`/pokemon/${pokemon.name}`} type={pokemon.type}>
              <PokemonName type={pokemon.type}>{pokemon.name}</PokemonName>
              <img src={pokemon.image} alt={pokemon.name} />
            </StyledLink>
          </PokemonContainer>
        ))}
      </ListContainer>
      <Button onClick={fetchMorePokemon}>Load more</Button>
    </AppContainer>
  );
}


const getTypeColorContainer = (type) => {
  switch (type) {
    case 'grass': return '#A7DB8D';
    case 'fire': return '#F5AC78';
    case 'water': return '#9DB7F5';
    case 'bug': return '#C6D16E';
    case 'normal': return '#C6C6A7';
    case 'poison': return '#C183C1';
    case 'electric': return '#FAE078';
    case 'ground': return '#EBD69D';
    case 'fairy': return '#F4BDC9';
    default: return '#D3D3D3';
  }
};

const getTypeColorName = (type) => {
  switch (type) {
    case 'grass': return '#78C850';
    case 'fire': return '#F08030';
    case 'water': return '#6890F0';
    case 'bug': return '#A8B820';
    case 'normal': return '#A8A878';
    case 'poison': return '#A040A0';
    case 'electric': return '#F8D030';
    case 'ground': return '#E0C068';
    case 'fairy': return '#EE99AC';
    default: return '#D3D3D3';
  }
};

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Header = styled.div`
  display: flex; 
  align-items: center;
  justify-content: center;
  gap: 50px;
  padding: 15px;
  width: 100%;
  box-sizing: border-box;

  button {
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
  }
`;

const Select = styled.select`
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: ;
  color: ;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  option {
    padding: 10px;
    background-color: ;
    color: ;
  }

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }

  &:hover {
    border-color: #007bff;
  }

  @media (max-width: 768px) {
    padding: 7px 10px;
  }
`;

const Image = styled.img`
  max-width: 150px;

  @media (max-width: 768px) {
    max-width: 100px;
  }
`;

const ThemeImage = styled.img`
  width: 30%;
`;

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 10px;
  max-width: 1440px;
`;

const PokemonContainer = styled.div`
  margin: 10px;
  padding: 10px;
  text-align: center;
  background-color: ${({ type }) => getTypeColorContainer(type)};
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
  text-transform: capitalize;
  transition: all 0.1s ease;

  &:hover {
    color: ${({ type }) => getTypeColorName(type)};
    font-weight: bold; 
  }
`;

const PokemonName = styled.h3` 
  transition: color 0.3s ease;
`;

const Button = styled.button`
  font-family: "Play", sans-serif;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  padding: 15px 30px;
  margin: 10px 0 30px;
  border-radius: 8px;
  cursor: pointer;
  background-color: #ee2929;
  color: #ffffff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
`;

export { PokemonList, Header, Image, ThemeImage };
