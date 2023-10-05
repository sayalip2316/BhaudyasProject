let s_nameEl=document.getElementById("s-name")
let s_emailEl=document.getElementById("s-email")
let s_passEl=document.getElementById("s-pass")
let prnEl=document.getElementById("prn");
const signInform=document.getElementById("signUp_form")

const loader=document.getElementById("loader");
// const loadermenu=document.getElementById("loadermenu");

loader.style.display="none";

const BaseURL="https://bustrackingapp.onrender.com";


signInform.addEventListener("submit",(event)=>{
    event.preventDefault();

    loader.style.display="block";

    const payload={
        userName:s_nameEl.value,
        email:s_emailEl.value,
        password:s_passEl.value,
        PRN:prnEl.value,
    }
    
    fetch(`${BaseURL}/user/register`,{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(payload)
    }).then(res=>res.json())
    .then(res=>{
        loader.style.display="none";

        if(!res.isError){
            
            SrefreshForm();
            showpopup(res.message,imgurl_ok)
        }else{
            
            SrefreshForm();
            showpopup(res.message,imageurl_failed)
            
        }
        
    })
    .catch(err=>console.log(err))
})

function SrefreshForm() {
    signInform.reset();
}
  


let l_emailEl=document.getElementById("l-email")
let l_passEl=document.getElementById("l-pass")
let loginForm=document.getElementById("login_form")

loginForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    loader.style.display="block";
    const payload={
        email:l_emailEl.value,
        password:l_passEl.value,
    }
    // console.log(payload)
    fetch(`${BaseURL}/user/login`,{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(payload)
    }).then(res=>res.json())
    .then(res=>{
        loader.style.display="none";

        if(!res.isError){
            localStorage.setItem("token",res.token);
            localStorage.setItem("userInfo",JSON.stringify(res.user));

            showpopup(res.message,imgurl_ok,true);
           
        }else{
            showpopup(res.message,imageurl_failed)
        } 
})
    .catch(err=>console.log(err.message));
})

//------------------------ popup message-------------------------------

const popup=document.getElementById("popup");
const imgurl_ok="./images/ok.png";
const imageurl_failed="./images/cancel.png";

function showpopup(message,imgurl,isredirect=false){
    
    popup.innerHTML=`
        <img id="popup_logo" src=${imgurl} alt="error">
        <p id="popup_text">${message}</p>
        <button id="popup_btn">OK</button>
    `
    popup.style.display="block";
    document.getElementById("popup_btn").addEventListener("click",()=>{
        hidepopup();
        if(isredirect){
            window.location.href="./dashboard.html";
        }
    })

}

function hidepopup(){
    popup.style.display="none";
}