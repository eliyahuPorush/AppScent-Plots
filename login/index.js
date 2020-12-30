let btnSubmit = document.getElementById('btnSubmit') ;
let errorMSG = document.querySelector('#error') ;
let email = document.querySelector('#email') ;
let password = document.querySelector('#password') ;


btnSubmit.onclick = (e) => {
    if(email.value && password.value){
        e.preventDefault() ;
        window.location.href = '../select-page/index.html' ;
    }
    else{
        e.preventDefault() ;
        errorMSG.style.display = 'block' ;
    }
}

