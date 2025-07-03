const creatureApiUrl = "https://rpg-creature-api.freecodecamp.rocks/api/creature";

// Get value for stat, if present
const getPokemonStatValue = (data, stat) => {
  return data.stats ?
    data
      .stats
      .find(entry => entry.name === stat)
      .base_stat
    : '';
}

const setStatValue = (name, value) => document.getElementById(name).innerText = value;

// Update display for current Creature
const showCreature = (data) => {
  // Attributes pre-pendend with 'creature-'
  setStatValue('creature-name', (data.name || '').toUpperCase());
  setStatValue('creature-id', data.id || '');
  // Attributes where name matches span
  [
    'weight',
    'height',
  ]
    .forEach(attribute => setStatValue(attribute, data[attribute] || ''));
  // Stat attributes
  [
    'hp',
    'attack',
    'defense',
    'special-attack',
    'special-defense',
    'speed',
  ]
    .forEach(stat => setStatValue(stat, getPokemonStatValue(data, stat)));
  // Types
  document.getElementById('types').innerHTML = data.types ?
    data
      .types
      .map(type => `<span>${type.name.toUpperCase()}</span>`)
      .join(" ")
    : "";
}

// Clear current display
const clearCreature = () => showCreature({});

// Fetch pokemon and display
const fetchCreature = (search) => {
  fetch(creatureApiUrl + "/" + search.toLowerCase())
    .then(res => res.json())
    .then(data => showCreature(data))
    .catch(err => {
      clearCreature();
      console.log("Error fetching creature:", err);
      alert("Creature not found");
    });
}

const searchAndDisplay = (event) => {
  const input = document.getElementById('search-input').value;

  event.preventDefault();
  fetchCreature(input);
}

document.getElementById('search-form').onsubmit = searchAndDisplay;
