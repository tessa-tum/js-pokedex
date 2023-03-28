// create pokemon list array

let pokemonList = [
  {name: 'Bulbasaur', height: 0.7, type: ['grass','poison']},
  {name: 'Ivysaur', height: 1, type: ['grass','poison']},
  {name: 'Venusaur', height:2, type:['grass','poison']},

  {name: 'Charmander', height:0.6, type:['fire']},
  {name: 'Charmeleon', height:1.1, type:['fire']},
  {name: 'Charizard', height:1.7, type:['fire','flying']},
];

// change for loop to forEach in order to display pokemon in the page DOM (with if-else statement), using <p> tag in JS string to separate lines

// for (let i = 0; i < pokemonList.length; i++) {
//   if (pokemonList[i].height > 1.8) {
//     document.write('<p>' + `${pokemonList[i].name} (height: ${pokemonList[i].height}) - wow, that's big!` + '</p>');
//   } else {
//     document.write('<p>' + `${pokemonList[i].name} (height: ${pokemonList[i].height})` + '</p>');
//     }
// }

pokemonList.forEach(function(pokemon){
  if (pokemon.height > 1.5) {
    document.write('<p>' + `${pokemon.name} (height: ${pokemon.height}) - Wow! That's big!`+ '</p>');
} else {
  document.write('<p>' + `${pokemon.name} (height: ${pokemon.height})` + '</p>');
} 
});
   

