import './App.css';
import PokemonCard from './components/PokemonCard';
import PokemonSearch from './components/PokemonSearch';
import React, { useState, useEffect } from 'react'

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [filter, setFilter] = useState("");
  const [isLoading, setLoading] = useState(true)

  const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 151; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(
          fetch(url)
          .then((res) => res.json()));
        console.log(promises)
    }
    console.log(promises)
    Promise.all(promises)
      .then((results) => {
        const pokemons = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name),
            weight: result.weight,
            height: result.height,
            id: result.id
        }));
        setPokemons(pokemons);
        setLoading(false);
    });
};

 useEffect(() => {
  fetchPokemon();
 }, []);

 const pokemonCards = pokemons.map(pokemon => (
  pokemon.name.includes(filter.toLowerCase()) &&
  <PokemonCard
      key={pokemon.id}
      id={pokemon.id}
      name={pokemon.name}
      type={pokemon.type}
      weight={pokemon.weight}
      height={pokemon.height}
      image={pokemon.image}
  />
  ))

  return (
    <div className='bg-blue-700 min-h-screen mx-auto'>
      <div className='container mx-auto p-5'>
        <div className="max-w-md container mx-auto">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png" />
        </div>
        <PokemonSearch searchText={(text) => setFilter(text)}/>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-6 mx-auto'>
          {isLoading ? <h1 className="col-span-4 text-[70px] text-white">Fetching Pokemon, please wait!</h1> : pokemonCards}
        </div>
      </div>
    </div>

  );
}

export default App;
