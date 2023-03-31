// start IIFE
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
  // add single items to pokemon list, validate type of data and keys
  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'detailsUrl' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {console.log('error');
  }
  }
  
  // check why more detailed add function does not work:
  // function add(item) {
  //   let keys = Object.keys(item);
  //   let validKeys = ['name', 'height', 'type'];
  //   if (typeof item === 'object' &&
  //       keys.every(function(key) {
  //           return validKeys.includes(key);
  //       })) {
  //       pokemonList.push(item);
  //   } else {
  //       console.log('Invalid entry');
  //   }
  // }

  // retrieve list
  function getAll() {
    return pokemonList;
  }

  // create filter function to find specific pokemon only by name
  function findByName(name) {
    return pokemonList.filter(function(item) {
      return item.name.toLowerCase() === name.toLowerCase();
    });
  }

  // render and style the pokemon list, incl. event listener for a click event that logs the clicked pokemon's name
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

  // fetch data for 150 pokemon from pokeapi and add pokemons as objects (name + detailsUrl)
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  // get data for each pokemon from detailsUrl (image + height + types)
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  // execute loadDetails() when pokemon is clicked (logs pokemon object details to console)
  function showDetails(item) {
    loadDetails(item).then(function () {
      console.log(item);
    });
  }

  // make functions accessible outside IIFE
  return {
    add: add,
    getAll: getAll,
    findByName: findByName,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
}) (); // end IIFE

//load pokemon list, then call getAll and forEach functions, return created items
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
})