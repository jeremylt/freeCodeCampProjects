const pokemonApiUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

// Get value for stat, if present
const getPokemonStatValue = (data, stat) => {
  if (!data.stats) return;
  for (const entry of data.stats) {
    if (entry.stat.name === stat) {
      return entry.base_stat;
    }
  }
}

// Update display for current Pokemon
const showPokemon = (data) => {
  // Attributes pre-pendend with 'pokemon-'
  {
    document.getElementById('pokemon-name').innerText = data.name.toUpperCase();
    document.getElementById('pokemon-id').innerText = '#' + data.id;
  }
  // Attributes where name matches span
  {
    const attributes = [
      'weight',
      'height',
    ]
    for (const attribute of attributes) {
      document.getElementById(attribute).innerText = data[attribute];
    }
  }
  // Stat attributes
  {
    const attributes = [
      'hp',
      'attack',
      'defense',
      'special-attack',
      'special-defense',
      'speed',
    ]
    for (const attribute of attributes) {
      const value = getPokemonStatValue(data, attribute);

      document.getElementById(attribute).innerText = value ? value : '';
    }
  }
  // Sprite  
  {
    document.getElementById('pokemon-sprite').innerHTML = data.sprites ?
      `<img id="sprite" src="${data.sprites.front_default}">`
      : '';
  }
  // Types
  document.getElementById('types').innerHTML = "";
  if (!data.types) return;
  for (const type of data.types) {
    document.getElementById('types').innerHTML += `<span> ${type.type.name.toUpperCase()}</span>`;
  }
}

// Clear current display
const clearPokemon = () => {
  showPokemon({
    name: '',
    id: '',
    weight: '',
    height: '',
  });
}

// Fetch pokemon and display
const fetchPokemon = (search) => {
  fetch(pokemonApiUrl + "/" + search.toLowerCase())
    .then(res => res.json())
    .then(data => showPokemon(data))
    .catch(err => console.log(err) && alert("Pokémon not found"));
}

const searchAndDisplay = (event) => {
  const input = document.getElementById('search-input').value;

  event.preventDefault();
  clearPokemon();
  fetchPokemon(input);
}

document.getElementById('search-form').onsubmit = searchAndDisplay;
