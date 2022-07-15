const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const {pokemon} = require('./pokedex.json');

app.use(express.json()); //Use espara que se le aplique una funcion a todas las peticiones
app.use(express.urlencoded({ extrended:true}));


/*app.get("/", (req //Toda la ifo se almacenara en req
,res //la respuesta que nosotros vamos a dar
,next) =>{
    res.status(200);
    res.send("Bienvenido al servidor perro");
})*/

/*
GET - Obtener recursos
POST - almacenar/crear recursos
PATH - modificar un oarte de un recurso
PUT - modifica un recurso
DELETE - borrar recurso 

*/

app.get("/", (req, res, next) => {
    res.status(200).send("Bienvenidos al Pokedex");
});

app.post("/pokemon/", (req, res, next) => {
    return res.status(200).send(req.body);
})

app.get("/pokemon", (req, res, next) => {
    //console.log(req.params.name);
    res.status(200).send(pokemon);
});

app.get("/pokemon/:id([0-9]{1,3})", (req, res, next) =>{ //Poque tiene el regex funciona antes del all?
    const id = req.params.id - 1;
    if(id >= 0 && id <= 150) {
        res.status(200).send(pokemon[req.params.id - 1]); //Si se pusiera return se quita el "else"
    }
    else{
        res.status(404).send("Pokemon no existente");
    }
});

app.get('/pokemon/:name([A-Za-z]+)', (req, res, next) => {
    const name = req.params.name;  
    /*Metodo Filter*/
    const pk = pokemon.filter((p) => {
        return (p.name.toUpperCase() == name.toUpperCase()) && p; 
        /*Esto es un operador ternario o como Mau dice IF fresa de una sola linea
        la formula sería... "condicion ? valor si verdadero : valor si falso"*/

        ///////////////////////////////////////////////////////////////////////        
        /* ---Esto es el IF clásico --
        if(p.name.toUpperCase() == name.toUpperCase()){
            return p;
        }*/ 
        ///////////////////////////////////////////////////////////////////////
    });
    //console.log(pk);

    (pk.length > 0) ?  
        res.status(200).send(pk) : 
        res.status(404).send("Pokemon no existe");
}); 

/*
Verbos HTTP, Los mas usados son: GET,POST,PATCH,PUT,DELETE*/

app.listen(process.env.PORT || 3000,() => {
    console.log("SERVER IS RUNNING")
}); //(Primero se pone el perto, luego una funcion flecha );