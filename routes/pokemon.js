const express = require('express');
const pokemon = express.Router(); //Esto hara que en lugar de "app.verbo" sea "pokemon.verbo"
const db = require('../config/database.js')
//const pk = require('../pokedex.json').pokemon; OJO, asi se conectaba antes cuando era el json

/*Verbos HTTP, los mas usados son:
GET - Obtener recursos
POST - almacenar/crear recursos
PATH - modificar un oarte de un recurso
PUT - modifica un recurso
DELETE - borrar recurso */

pokemon.post("/", async (req, res, next) => {
    const {pok_name, pok_height, pok_weight, pok_base_experience} = req.body; //Aqui se esta desconstruyendo

    if(pok_name && pok_height && pok_weight && pok_base_experience){
        let query = "INSERT INTO pokemon (pok_name, pok_height, pok_weight, pok_base_experience)";
        query += ` VALUES('${pok_name}',${pok_height},${pok_weight}, ${pok_base_experience})`; //Acuerdate de poner en comilla simle los varchar
        const rows = await db.query(query);

        if(rows.affectedRows == 1) {
            return res.status(201).json({code: 201, message: "Pokemon Insertado"});
        }
        return res.status(500).json({code: 500, message: "Pokemon no insertado"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"})
});

pokemon.get("/", async (req, res, next) => {
    const pkmn = await db.query("SELECT * FROM pokemon"); //El await esperaria por resultados
    //console.log(req.params.name);
    return res.status(200).json({code: 1, message: pkmn});
});

pokemon.get("/:id([0-9]{1,3})", async (req, res, next) =>{ //Poque tiene el regex funciona antes del all?
    const id = req.params.id;
    if(id >= 1 && id <= 722) {
        const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_id=" + id + ";");
        return res.status(200).json({code: 200, message: pkmn}); //Si se pusiera return se quita el "else"
    }
    else{
        return res.status(404).send({code: 404, message: "No se encontro el pokemon"});
    }
});

pokemon.get('/:name([A-Za-z]+)', async (req, res, next) => {
    const name = req.params.name;  
    /*Metodo Filter*/
    const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_name='" + name + "';");
        if (pkmn.length > 0) {
            return res.status(200).json({code: 200, message: pkmn})
        } 
        return res.status(404).send({code: 404, message: "No se encontro el pokemon"});
        /*Esto es un operador ternario o como Mau dice IF fresa de una sola linea
        la formula sería... "condicion ? valor si verdadero : valor si falso"*/

        ///////////////////////////////////////////////////////////////////////        
        /* ---Esto es el IF clásico --
        if(p.name.toUpperCase() == name.toUpperCase()){
            return p;
        }*/ 
        ///////////////////////////////////////////////////////////////////////
    });
module.exports = pokemon; //Manera sencilla de exportar, lo malo es que exporta una sola cosa
