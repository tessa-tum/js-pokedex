// start pokemonRepository IIFE
let pokemonRepository = (() => {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  // add single items to pokemon list, validate type of data and keys
  const add = (pokemon) => {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("error");
    }
  };

  // retrieve list
  const getAll = () => {
    return pokemonList;
  };

  // trigger search function
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", () => {
    findByName(searchInput.value);
  });

  // search function to find specific pokemon by name
  const findByName = (searchInput) => {
    const filteredPokemonList = pokemonList.filter((pokemon) => {
      return pokemon.name.toLowerCase().includes(searchInput.toLowerCase());
    });

    const pokemonListElement = document.querySelector(".pokemon-list");
    pokemonListElement.innerHTML = [];

    filteredPokemonList.forEach((pokemon) => {
      pokemonRepository.addListItem(pokemon);
    });
  };

  /*
   * function to render and style the pokemon list,
   * toggle modal,
   * add event listener for button click loading respective pokemon data
   */
  const addListItem = (pokemon) => {
    const pokemonList = document.querySelector(".pokemon-list");
    const listPokemon = document.createElement("li");
    const button = document.createElement("button");

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

    button.addEventListener("click", () => {
      showDetails(pokemon);
    });
  };

  // execute loadDetails() when pokemon is clicked (logs pokemon object details to modal)
  const showDetails = (item) => {
    loadDetails(item).then(() => {
      showModal(item);
    });
  };

  // display a modal containing pokemon details
  const showModal = (item) => {
    const modalBody = $(".modal-body");
    const modalTitle = $(".modal-title");

    modalTitle.empty();
    modalBody.empty();

    const nameElement = $(`<h1>${item.name}</h1>`);

    const imageElementFr = $('<img class="modal-img">').attr(
      "src",
      item.imageUrl
    );

    const idElement = $(
      `<p><span style="font-weight: bold"># </span>${item.id}</p>`
    );

    const heightElement = $(
      `<p><span style="font-weight: bold">Height: </span>${item.height}</p>`
    );

    const typeElement = $(
      `<p><span style="font-weight: bold">Types: </span>${item.types
        .map((type) => type.type.name)
        .join(" | ")}</p>`
    );

    const abilityElement = $(
      `<p><span style="font-weight: bold">Abilities: </span>${item.abilities
        .map((ability) => ability.ability.name)
        .join(" | ")}</p>`
    );

    modalTitle.append(nameElement);
    modalBody.append(imageElementFr);
    modalBody.append(idElement);
    modalBody.append(heightElement);
    modalBody.append(typeElement);
    modalBody.append(abilityElement);
  };

  // fetch data for 150 pokemon from pokeapi and add pokemons as objects (name + detailsUrl)
  const loadList = () => {
    return fetch(apiUrl)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        json.results.forEach((item) => {
          const pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // get data for each pokemon from detailsUrl (image + height + types)
  const loadDetails = (item) => {
    const url = item.detailsUrl;
    return fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((details) => {
        item.imageUrl = details.sprites.other.dream_world.front_default;
        item.height = details.height;
        item.types = details.types;
        item.id = details.id;
        item.abilities = details.abilities;
      })
      .catch((e) => {
        console.error(e);
      });
  };

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
pokemonRepository.loadList().then(() => {
  pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
  });
});
