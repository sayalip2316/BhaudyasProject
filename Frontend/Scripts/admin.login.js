let l_emailEl=document.getElementById("l-email")
let l_passEl=document.getElementById("l-pass")
let loginForm=document.getElementById("admin_login_form")

const loader=document.getElementById("loader");

loader.style.display="none";

loginForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    loader.style.display="block";
    const payload={
        email:l_emailEl.value,
        password:l_passEl.value,
    }
     console.log(payload)
    fetch("https://bustrackingapp.onrender.com/user/admin/login",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(payload)
    }).then(res=>res.json())
    .then(res=>{
        loader.style.display="none";

        if(!res.isError){
           
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
            window.location.href="./adminPage.html";
        }
    })

}

function hidepopup(){
    popup.style.display="none";
}