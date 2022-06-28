const express = require('express');
const app = express();

app.get("/", (req /*Toda la ifo se almacenara en req*/, 
res/*la respuesta que nosotros vamos a dar*/, 
next) =>{
    res.status(200);
    res.send("Bienvenido al servidor perro");
})

app.get("/:name", (req, res, next) => {
    console.log(req.params.name);
    res.status(200);
    res.send("Esta en la pagina de " + req.params.name)
})

/*
Verbos HTTP, Los mas usados son: GET,POST,PATCH,PUT,DELETE*/

app.listen(process.env.PORT || 3000,() => {
    console.log("SERVER IS RUNNING")
}); //(Primero se pone el perto, luego una funcion flecha );