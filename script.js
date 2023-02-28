const popup = document.querySelector(".popup"),
wifiIcon = document.querySelector(".icon i"),
popuptitre = document.querySelector(".popup .titre"),
popupdesc = document.querySelector(".desc"),
reconnecterbtn = document.querySelector(".reconnecter");
let isOnline = true, intrvalId, timer = 10;

const checkconnection = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        isOnline= response.status >=200 && response.status < 300;
        console.log(response)

    }catch(error){
        isOnline= false;
    }
    timer= 10;
    clearInterval(intrvalId);
    handlePopup(isOnline);
}
const handlePopup = (status) => {
    if(status){
        wifiIcon.className = "uil uil-wifi-slash";
        popuptitre.innerText = "reconnecter";
        popupdesc.innerHTML= "vous etes reconnecter a nouveu.";
        popup.classList.add("online");
        return setTimeout(()=> popup.classList.remove("show"),2000);
    }
    wifiIcon.className = "uil uil-wifi-slash";
    popuptitre.innerText ="connection perdue";
    popupdesc.innerHTML = "connection non trouver. connecter dans <b>10</b> second.";
    popup.className = "popup show";
    intrvalId = setInterval(() => {
        timer--;
        if(timer === 0 ) checkconnection();
        popup.querySelector(".desc b").innerText = timer;
     },1000); 

}
setInterval(()=> isOnline && checkconnection(),3000);
reconnecterbtn.addEventListener("click",checkconnection);