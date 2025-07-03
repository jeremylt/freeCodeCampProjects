const creatureApiUrl = "https://rpg-creature-api.freecodecamp.rocks/api/creature";

// Get value for stat, if present
const getPokemonStatValue = (data, stat) => {
  if (!data.stats) return '';
  for (const entry of data.stats) {
    if (entry.name === stat) return entry.base_stat;
  }
}

// Update display for current Creature
const showCreature = (data) => {
  // Attributes pre-pendend with 'creature-'
  document.getElementById('creature-name').innerText = (data.name || '').toUpperCase();
  document.getElementById('creature-id').innerText = data.id || '';
  // Attributes where name matches span
  [
    'weight',
    'height',
  ]
    .forEach(attribute => document.getElementById(attribute).innerText = data[attribute] || '');
  // Stat attributes
  [
    'hp',
    'attack',
    'defense',
    'special-attack',
    'special-defense',
    'speed',
  ]
    .forEach(stat => document.getElementById(stat).innerText = getPokemonStatValue(data, stat));
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
      console.log("Error fetching creature:", err);
      alert("Creature not found");
    });
}

const searchAndDisplay = (event) => {
  const input = document.getElementById('search-input').value;

  event.preventDefault();
  clearCreature();
  fetchCreature(input);
}

document.getElementById('search-form').onsubmit = searchAndDisplay;
