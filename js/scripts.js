// create pokemon list array, wrap in IIFE

let pokemonRepository = (function() {
  let pokemonList = [
    {name: 'Bulbasaur', height: 0.7, type: ['grass','poison']},
    {name: 'Ivysaur', height: 1, type: ['grass','poison']},
    {name: 'Venusaur', height:2, type:['grass','poison']},

    {name: 'Charmander', height:0.6, type:['fire']},
    {name: 'Charmeleon', height:1.1, type:['fire']},
    {name: 'Charizard', height:1.7, type:['fire','flying']},
  ];
  
  // create add function to add single items to the pokemonList, validate type of data and object.keys of the parameter

  function add(item) {
    let keys = Object.keys(item);
    let validKeys = ['name', 'height', 'type'];
    if (typeof item === 'object' &&
        keys.every(function(key) {
            return validKeys.includes(key);
        })) {
        pokemonList.push(item);
    } else {
        console.log('Invalid entry');
    }
  }

  // create filter function to find specific pokemon only by name

  function findByName(name) {
    return pokemonList.filter(function(item) {
      return item.name.toLowerCase() === name.toLowerCase();
    });
  }

  function getAll() {
    return pokemonList;
  }

  // create addListItem function to render and style the pokemonList, incl. event listener for a click event that logs the clicked pokemon's name

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listPokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
    }

    function showDetails(pokemon) {
      console.log(pokemon.name);
    }

  return {
    add: add,
    getAll: getAll,
    findByName: findByName,
    addListItem: addListItem
  };
}) ();

//create forEach loop to access the wrapped pokemonList array
   
pokemonRepository.getAll().forEach(function(pokemon){
  pokemonRepository.addListItem(pokemon);
});
