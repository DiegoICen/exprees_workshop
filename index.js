const morgan = require('morgan'); //Morgan es un middleware que te indicara si llega o no una peticion, OJO solo usala en produccion.
const express = require('express');
const app = express();
const pokemon = require('./routes/pokemon.js');

app.use(morgan('dev'));
app.use(express.json()); //Use espara que se le aplique una funcion a todas las peticiones, un middleware
app.use(express.urlencoded({ extrended:true}));


/*app.get("/", (req //Toda la ifo se almacenara en req
,res //la respuesta que nosotros vamos a dar
,next) =>{
    res.status(200);
    res.send("Bienvenido al servidor perro");
})*/

/*Verbos HTTP, los mas usados son:
GET - Obtener recursos
POST - almacenar/crear recursos
PATH - modificar un oarte de un recurso
PUT - modifica un recurso
DELETE - borrar recurso */

app.get("/", (req, res, next) => {
    res.status(200).json({code: 1, message: "Bienvenidos al Pokedex"})
});

app.use("/pokemon", pokemon);

app.use((req,res,next) => {
    return res.status(404).json({code : 404, message: "URL no encontrada"});
});

app.listen(process.env.PORT || 3000,() => {
    console.log("SERVER IS RUNNING")
}); //(Primero se pone el perto, luego una funcion flecha );