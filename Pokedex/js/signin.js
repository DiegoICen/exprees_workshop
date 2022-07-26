window.onload = init; //decirle al navegador que cuando esto se ejecute se activa la funcion

function init() {
    if(!localStorage.getItem("token")){ //El simbolo ! al lado de localStrage es como "si NO existe el token" 
        document.querySelector('.btn-secondary').addEventListener('click', function() {
            window.location.href = "login.html"
        });
    
        document.querySelector('.btn-primary').addEventListener('click', signin); //.btn esta en login.html son valores declarados    
    }else{
        window.location.href = "pokedex.html"
    }
    
}

function signin() {
    var name = document.getElementById('input-name').value;
    var mail = document.getElementById('input-mail').value;
    var pass = document.getElementById('input-password').value;

    axios({
        method: 'post' ,
        url: 'http://localhost:3000/user/signin',
        data: {
            user_name: name,
            user_mail: mail,
            user_password: pass
        }
    }).then(function(res) {
        console.log(res);
        alert("Registro Exitoso"); //Para que salga un promt de msj exitoso
        window.location.href = "login.html";
    }).catch(function(err){
        console.log(err);
    })
}