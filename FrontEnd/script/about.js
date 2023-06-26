
/* dark mode */



let modechange = document.querySelector("#modechanger")
console.log(modechange)

modechange.addEventListener("click" , (e)=>{

    let modeselect = localStorage.getItem("displaymode") || "Light";

   
    if(modeselect === "Light"){
       
        document.body.style.backgroundColor = 'black'
        document.body.style.color='white'
        document.getElementById("myemail").style.color='aqua'
        document.getElementById("myname").style.color='aqua'
        document.querySelector('nav').style.backgroundColor='black'
        document.querySelector("#modechanger").style.color='aqua'
        document.querySelector('.Myappfooter').style.borderColor = 'white'

        localStorage.setItem("displaymode","Dark");
    }
    else{
       
        
        document.body.style.backgroundColor = 'white'
        document.body.style.color='black'
        document.getElementById("myemail").style.color='black'
        document.getElementById("myname").style.color='black'
        document.querySelector('nav').style.backgroundColor='whitesmoke'
        document.querySelector("#modechanger").style.color='black'
        document.querySelector('.Myappfooter').style.borderColor = 'black'

        localStorage.setItem("displaymode","Light");
      
     
    }

})