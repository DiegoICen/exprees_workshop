module.exports = (req,res,next) => {
    //Con esto permito el acceso a todos usuarios
    res.header("Access-Control-Allow-Origin", "*"); /*En lugar de *, pudiese poner una IP en especifico para no aceptar a todos los usuarios*/
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === 'OPTIONS'){
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET"); //pARA DECIRLE QUE METODOS ACEPTA
        return res.status(200).json({});
    }
    next();
}