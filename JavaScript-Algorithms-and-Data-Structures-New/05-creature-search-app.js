const creatureApiUrl = "https://rpg-creature-api.freecodecamp.rocks/api/creature";

// Get value for stat, if present
const getPokemonStatValue = (data, stat) => {
  if (!data.stats) return;
  for (const entry of data.stats) {
    if (entry.name === stat) {
      return entry.base_stat;
    }
  }
}

// Update display for current Creature
const showCreature = (data) => {
  // Attributes pre-pendend with 'creature-'
  {
    document.getElementById('creature-name').innerText = data.name.toUpperCase();
    document.getElementById('creature-id').innerText = '#' + data.id;
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
    const stats = [
      'hp',
      'attack',
      'defense',
      'special-attack',
      'special-defense',
      'speed',
    ]
    for (const stat of stats) {
      const value = getPokemonStatValue(data, stat);

      document.getElementById(stat).innerText = value ? value : '';
    }
  }
  // Types
  document.getElementById('types').innerHTML = "";
  if (!data.types) return;
  for (const type of data.types) {
    document.getElementById('types').innerHTML += `<span> ${type.name.toUpperCase()}</span>`;
  }
}

// Clear current display
const clearCreature = () => {
  showCreature({
    name: '',
    id: '',
    weight: '',
    height: '',
  });
}

// Fetch pokemon and display
const fetchCreature = (search) => {
  fetch(creatureApiUrl + "/" + search.toLowerCase())
    .then(res => res.json())
    .then(data => showCreature(data))
    .catch(err => {
      console.log(err);
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
