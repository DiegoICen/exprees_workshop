const express = require('express');
const app = express();

app.get("/", (req /*Toda la ifo se almacenara en req*/, 
res/*la respuesta que nosotros vamos a dar*/, 
next) =>{
    res.status(200);
    res.send("Bienvenido al servidor");
})

/*
Verbos HTTP

Los mas usados son: GET,POST,PATCH,PUT,DELETE*/

app.listen(3000,() => {
    console.log("SERVER IS RUNNING")
}); //(Primero se pone el perto, luego una funcion flecha );