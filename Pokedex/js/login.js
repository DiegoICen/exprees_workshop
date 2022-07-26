window.onload = init; //decirle al navegador que cuando esto se ejecute se activa la funcion

function init() {
    if(!localStorage.getItem("token")){ //El simbolo ! al lado de localStrage es como "si NO existe el token" 
        document.querySelector('.btn-secondary').addEventListener('click', function() {
            window.location.href = "signin.html"
        });
    
        document.querySelector('.btn-primary').addEventListener('click', login); //.btn esta en login.html son valores declarados        
    }else{
        window.location.href = "pokedex.html"
    }
    
}

function login() {
    var mail = document.getElementById('input-mail').value;
    var pass = document.getElementById('input-password').value;

    axios({
        method: 'post' ,
        url: 'http://localhost:3000/user/login',
        data: {
            user_mail: mail,
            user_password: pass
        }
    }).then(function(res) {
        if(res.data.code == 200) {
            localStorage.setItem("token", res.data.message); //LocalStorage guarda la información de acceso en el almacenamiento local del navegador
            window.location.href = "pokedex.html";
        }
        else{
            alert("Usuario y/o contraseña incorectos")
        }
    }).catch(function(err){
        console.log(err);
    })
}