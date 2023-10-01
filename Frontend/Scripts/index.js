const login=document.getElementById("login-btn");
const signup=document.getElementById("signup-btn");
const btn=document.getElementById("btn");

function redirect(){
    window.location.href="./login_signup.html";
}

login.addEventListener("click",()=>{
    redirect();
});

signup.addEventListener("click",()=>{
    redirect();
});

btn.addEventListener("click",()=>{
    redirect();
})