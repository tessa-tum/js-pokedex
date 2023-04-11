// start pokemonRepository IIFE
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  // add single items to pokemon list, validate type of data and keys
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("error");
    }
  }

  // retrieve list
  function getAll() {
    return pokemonList;
  }

  // trigger search function
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", function () {
    findByName(searchInput.value);
  });

  // search function to find specific pokemon by name
  function findByName(searchInput) {
    const filteredPokemonList = pokemonList.filter(function (pokemon) {
      return pokemon.name.toLowerCase().includes(searchInput.toLowerCase());
    });

    let pokemonListElement = document.querySelector(".pokemon-list");
    pokemonListElement.innerHTML = [];

    filteredPokemonList.forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  }

  /*
   * function to render and style the pokemon list,
   * toggle modal,
   * add event listener for button click loading respective pokemon data
   */
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listPokemon = document.createElement("li");
    let button = document.createElement("button");

    listPokemon.classList.add("list-group-item");
    button.innerText = pokemon.name;
    button.classList.add("btn");
    button.classList.add("btn-pokemon");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#pokemon-modal");
    listPokemon.classList.add("col-xl-3");
    listPokemon.classList.add("col-lg-4");
    listPokemon.classList.add("col-md-6");

    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);

    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  // execute loadDetails() when pokemon is clicked (logs pokemon object details to modal)
  function showDetails(item) {
    loadDetails(item).then(function () {
      showModal(item);
    });
  }

  // display a modal containing pokemon details
  function showModal(item) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");

    modalTitle.empty();
    modalBody.empty();

    let nameElement = $("<h1>" + item.name + "</h1>");

    let imageElementFr = $('<img class="modal-img">');
    imageElementFr.attr("src", item.imageUrl);

    let idElement = $(
      "<p>" + '<span style="font-weight: bold"># </span>' + item.id + "</p>"
    );

    let heightElement = $(
      "<p>" +
        '<span style="font-weight: bold">Height: </span>' +
        item.height +
        "</p>"
    );

    let typeElement = $(
      "<p>" +
        '<span style="font-weight: bold">Types: </span>' +
        item.types.map((type) => type.type.name).join(" | ") +
        "</p>"
    );

    let abilityElement = $(
      "<p>" +
        '<span style="font-weight: bold">Abilities: </span>' +
        item.abilities.map((ability) => ability.ability.name).join(" | ") +
        "</p>"
    );

    modalTitle.append(nameElement);
    modalBody.append(imageElementFr);
    modalBody.append(idElement);
    modalBody.append(heightElement);
    modalBody.append(typeElement);
    modalBody.append(abilityElement);

    modalBody.prepend(imageElementFr); // Inserting image element at the beginning of modalBody
  }

  // fetch data for 150 pokemon from pokeapi and add pokemons as objects (name + detailsUrl)
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // get data for each pokemon from detailsUrl (image + height + types)
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.other.dream_world.front_default;
        item.height = details.height;
        item.types = details.types;
        item.id = details.id;
        item.abilities = details.abilities;
      })
      .catch(function (e) {
        console.error(e);
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
    showDetails: showDetails,
    showModal: showModal,
  };
})();
// end pokemonRepository IIFE

// load pokemon list, then call getAll and forEach functions, return created items
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
