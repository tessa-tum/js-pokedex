// start pokemonRepository IIFE
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
      item.id = details.id
    }).catch(function (e) {
      console.error(e);
    });
  }

  // execute loadDetails() when pokemon is clicked (logs pokemon object details to console)
  function showDetails(item) {
    loadDetails(item).then(function () {
      showModal(item.name, "#ID: " + item.id, "Height: " + item.height, item.imageUrl);
    });
  }

  // display a modal containing pokemon details
  let modalContainer = document.querySelector('#modal-container');
  
  function showModal(title, text1, text2, image) {
    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = title;

    let modalID = document.createElement('p');
    modalID.innerText = text1;

    let modalHeight = document.createElement('p');
    modalHeight.innerText = text2;

    let imageElement = document.createElement('img');
    imageElement.src = image

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(modalID);
    modal.appendChild(modalHeight);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);
    
    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();  
    }
  });
  
  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

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
}) () // end pokemonRepository IIFE

//load pokemon list, then call getAll and forEach functions, return created items
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
})