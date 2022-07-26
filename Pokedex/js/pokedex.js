window.onload = init; //El onlone es para que cargue la funcion init
var headers = {}
var url = "http://localhost:3000";

function init() {
    if(localStorage.getItem("token")){// Si hay token entras
        headers = {
            headers: {
                'Authorization' : "bearer " + localStorage.getItem("token")
            }
        }
        loadPokemon();
    }else{
        window.location.href = "index.html"; //Si no hay te redirigira, sin embargo algunos navegadores aun sin token dejaran entrar
    }
}

function loadPokemon() { // Aqui una vez verificada la conexcion, te llevaria a la pagina del Pokedex
    axios.get(url + "/pokemon",headers)
    .then(function(res) {
        console.log(res);
        displayPokemon(res.data.message);
    }).catch(function(err){
        console.log(err);
    })
}

function displayPokemon(pokemon){ //Va a resivir y desplegar la info de los pokemons, dandoles formato
    var body= document.querySelector("body");
    for(var i = 0; i < pokemon.length; i++){
        body.innerHTML +=  `<h3>${pokemon[i].pok_name}</h3>`;
    }
}