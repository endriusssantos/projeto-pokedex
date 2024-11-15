import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Header, Image, ThemeImage } from '../PokemonList';
import { ThemeContext } from '../../contexts/ThemeContext';
import lightIcon from '../../images/moon.png';
import darkIcon from '../../images/sun.png';
import LogoPokedex from '../../images/logo-pokemon.png';
import Arrow from '../../images/arrow.png';
import ArrowMobile from '../../images/arrow-mobile.png';

function PokemonDetails() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const { isDark, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    async function fetchPokemonDetails() {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const pokemonData = response.data;

        const abilities = await Promise.all(
          pokemonData.abilities.map(async (abilityInfo) => {
            const abilityResponse = await axios.get(abilityInfo.ability.url);
            const abilityDescription = abilityResponse.data.effect_entries.find(entry => entry.language.name === 'en').effect;

            return {
              name: abilityInfo.ability.name,
              description: abilityDescription,
            };
          })
        );

        setPokemonDetails({
          name: pokemonData.name,
          image: pokemonData.sprites.front_default,
          moves: pokemonData.moves.map(moveInfo => moveInfo.move.name),
          abilities: abilities,
          types: pokemonData.types.map(typeInfo => typeInfo.type.name),
        });
      } catch (error) {
        console.error("Erro ao buscar detalhes do Pokémon:", error);
      }
    }

    fetchPokemonDetails();
    window.scrollTo(0, 0);
  }, [name]);

  if (!pokemonDetails) return <LoadingMsg>Loading...</LoadingMsg>;

  const primaryTypeColor = typeColorsSoft[pokemonDetails.types[0]];

  return (
    <DetailsContainer>
      <Header>
        <button onClick={toggleTheme}>
          <ThemeImage src={isDark ? darkIcon : lightIcon} alt="theme" />
        </button>
        <a href="/">
          <Image src={LogoPokedex} alt="logo" />
        </a>
      </Header>
      <DetailsCard color={primaryTypeColor}>
        <ButtonBack onClick={() => navigate(-1)}>
          <picture>
            <source media="(max-width: 768px)" srcSet={ArrowMobile} />
            <source media="(min-width: 769px)" srcSet={Arrow} />
            <img src={Arrow} alt="arrow" />
          </picture>
        </ButtonBack>
        <PokemonName>{pokemonDetails.name}</PokemonName>
        <img src={pokemonDetails.image} alt={pokemonDetails.name} />

        <Titles>Types</Titles>
        <ListTypes>
          {pokemonDetails.types.map((type, index) => (
            <li key={index} style={{ color: typeColorsStrong[type] }}>{type}</li>
          ))}
        </ListTypes>

        <Titles>Moves</Titles>
        <ListMoves>
          {pokemonDetails.moves.map((move, index) => (
            <li key={index}>{move}</li>
          ))}
        </ListMoves>

        <Titles>Abilities</Titles>
        <ListAbilities>
          {pokemonDetails.abilities.map((ability, index) => (
            <AbilitiesInfo key={index}>
              <strong>{ability.name}</strong>
              <span>{ability.description}</span>
            </AbilitiesInfo>
          ))}
        </ListAbilities>
      </DetailsCard>
    </DetailsContainer>
  );
}

const typeColorsSoft = {
  grass: '#A8D5A2',
  fire: '#F4A698',
  water: '#A2C8F4',
  electric: '#FBE182',
  bug: '#C6D16E',
  normal: '#C6C6A7',
  poison: '#D6A2D6',
  ground: '#E8D5A2',
  flying: '#C8BDF4',
  fairy: '#F4BDC9',
  fighting: '#D98282',
  psychic: '#FA92B2',
  rock: '#D1C17D',
  ghost: '#A292BC',
  ice: '#C2E8E8',
  dragon: '#B3A2F4',
  dark: '#A8A878',
  steel: '#D1D1E0',
};

const typeColorsStrong = {
  grass: '#78C850',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  bug: '#A8B820',
  normal: '#A8A878',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  fairy: '#EE99AC',
  fighting: '#C03028',
  psychic: '#F85888',
  rock: '#B8A038',
  ghost: '#705898',
  ice: '#98D8D8',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
};

const LoadingMsg = styled.p`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 18px;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DetailsCard = styled.div`
  background-color: ${(props) => props.color || '#F5AC78'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 50%;
  margin: 30px 0;
  padding: 20px;
  border-radius: 20px;
  position: relative;
`;

const ButtonBack = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  position: absolute;
  top: 3%;
  left: 3%;

  @media (max-width: 768px) {
    top: 0.5%;
    left: 2%;
  }
`;

const PokemonName = styled.h1`
  text-transform: capitalize;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
`;

const Titles = styled.h2`
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
`;

const ListTypes = styled.ul`
  display: flex;
  gap: 20px;
  padding: 0;
  text-transform: capitalize;
  list-style: none;

  li {
    font-weight: bold;
    padding: 5px 10px;
    border-radius: 12px;
    color: ${(props) => typeColorsStrong[props.type]};
    background-color: #f0f0f0;
  }
`;

const ListMoves = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  padding: 0;
  text-transform: capitalize;
  list-style: none;

  li {
    padding: 5px 8px;
    color: #333333;
    background-color: #f0f0f0;
    border-radius: 8px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  }
`;

const ListAbilities = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    margin: 10px 0;
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  }
`;

const AbilitiesInfo = styled.li`
  strong {
    color: #333333;
    text-transform: capitalize;
  }

  span {
    display: block;
    color: #666666;
    margin-top: 5px;
  }
`;

export { PokemonDetails };
