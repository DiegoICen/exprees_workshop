//Librerias
const morgan = require('morgan'); //Morgan es un middleware que te indicara si llega o no una peticion, OJO solo usala en produccion.
const express = require('express');
const app = express();
//Routers
const pokemon = require('./routes/pokemon.js');
const user = require('./routes/user.js');
const auth = require('./middleware/auth.js');
const notFound = require('./middleware/notFound.js');
const index = require('./middleware/index.js');
const cors = require('./middleware/cors.js');
/*Verbos HTTP, los mas usados son:
GET - Obtener recursos
POST - almacenar/crear recursos
PATH - modificar un oarte de un recurso
PUT - modifica un recurso
DELETE - borrar recurso */

//Loa Middelware
app.use(cors);
app.use(morgan('dev'));
app.use(express.json()); //Use espara que se le aplique una funcion a todas las peticiones, un middleware
app.use(express.urlencoded({ extrended:true}));

app.get("/", index); //La bienvenida a la API
/*app.get("/", (req //Toda la ifo se almacenara en req
,res //la respuesta que nosotros vamos a dar
,next) =>{
    res.status(200);
    res.send("Bienvenido al servidor perro");
})*/
app.use("/user", user); //El orden es importante, se lee de arriba hacia abajo
app.use(auth);
app.use("/pokemon", pokemon);
app.use(notFound);

app.listen(process.env.PORT || 3000,() => {
    console.log("SERVER IS RUNNING")
}); //(Primero se pone el perto, luego una funcion flecha );