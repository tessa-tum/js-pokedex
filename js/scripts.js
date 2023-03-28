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

  function findByName(name) {
    return pokemonList.filter(function(item) {
      return item.name.toLowerCase() === name.toLowerCase();
    });
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll,
    findByName: findByName
  };
}) ();

// change for loop to forEach method

// for (let i = 0; i < pokemonList.length; i++) {
//   if (pokemonList[i].height > 1.8) {
//     document.write('<p>' + `${pokemonList[i].name} (height: ${pokemonList[i].height}) - wow, that's big!` + '</p>');
//   } else {
//     document.write('<p>' + `${pokemonList[i].name} (height: ${pokemonList[i].height})` + '</p>');
//     }
// }

// pokemonList.forEach(function(pokemon){
//   if (pokemon.height > 1.5) {
//     document.write('<p>' + `${pokemon.name} (height: ${pokemon.height}) - Wow! That's big!`+ '</p>');
// } else {
//   document.write('<p>' + `${pokemon.name} (height: ${pokemon.height})` + '</p>');
// } 
// });

//Update forEach loop so that it can access the wrapped pokemonList array
   
pokemonRepository.getAll().forEach(function(pokemon){
  if (pokemon.height > 1.5) {
    document.write('<p>' + `${pokemon.name} (height: ${pokemon.height}) - Wow! That's big!`+ '</p>');
} else {
  document.write('<p>' + `${pokemon.name} (height: ${pokemon.height})` + '</p>');
} 
});
