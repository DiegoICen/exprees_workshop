const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>{
    try{
        const token = req.headers.authorization.split(" ")[1]; //header o headers?
        const decoded = jwt.verify(token, "debugkey");
        req.user = decoded;
        next(); //Una vez que valida manda a llamar la siguiente funcion, en este caso pokemon

    }
    catch(error){
        return res.status(401).json({code: 401, message: "No tiene permiso : ("});

    }
}