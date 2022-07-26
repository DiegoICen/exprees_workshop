const express = require('express');
const jwt = require('jsonwebtoken');
const user = express.Router(); //Esto hara que en lugar de "app.verbo" sea "user.verbo"
const db = require('../config/database.js');

user.post ("/signin" , async (req,res,next) => {
    const {user_name, user_mail, user_password} = req.body;

    if(user_name && user_mail && user_password) {
        let  query = "INSERT INTO user(user_name, user_mail, user_password) "
        query += `VALUES ('${user_name}', '${user_mail}', '${user_password}')`;    
        const rows = await db.query(query);
    
        if(rows.affectedRows == 1){
            return res.status(201).json({code: 201, message: "Usuario registrado correctamente"})
        };
        return res.status(500).json({code: 500, message : "Ocurrio un error"});        
    }
    return res.status(500).json({code: 500, message : "Campos incompletos"});    
});

user.post("/login", async (req, res, next) => { //Log in siempre sera por POST no envia por texto plano, si no por encabezado por ende el usuario no lo vera
    const { user_mail, user_password } = req.body; //Esto checaria esos valores para hacer el login
    const query = `SELECT * FROM user WHERE user_mail = '${user_mail}' AND user_password = '${user_password}';`;
    const rows = await db.query(query);

    if (user_mail && user_password){        
        if(rows.length == 1){            
            const token = jwt.sign({
                user_id: rows[0].user_id,
                user_mail: rows[0].user_mail
            }, "debugkey"); /*Esta llave solo la sabras tu, se almacena en el servidor y con esto decodificara la info*/
            return res.status(200).json({code: 200, message: token });
        }
        else {
            return res.status(200).json({code: 401, message: "Usuario y/o contraseña incorrecta"});
        }
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

user.get("/", async (req,res,next) => {
    const query = "SELECT * FROM user";
    const rows = await db.query(query)

    return res.status(200).json({code: 200, message: rows})
});

module.exports = user;