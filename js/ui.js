let row = document.getElementById("row");
let detalisInfo = document.getElementById("detalisInfo");
let innerItemDetalis = document.getElementById("innerItemDetalis");
let links = document.querySelectorAll(".nav-link");
let mainData = document.getElementById("mainData");
let items = document.querySelectorAll(".item");
let detailsGame = document.getElementById("detailsGame");
let item = document.getElementsByClassName("item");
let closedetails = document.getElementById("close");
let signUp = document.getElementById("signUp")
let signIn = document.getElementById("signIn")
let inpName = document.getElementById("inpName")
let inpEmail = document.getElementById("inpEmail")
let inpPass = document.getElementById("inpPass")
let btnSignUp= document.getElementById("btnSignUp")
let login= document.getElementById("login")
let loginSect = document.getElementById("loginSect")

let personData ;
if(localStorage.getItem("users")==null){
  personData=[]
}else{
  personData = JSON.parse(localStorage.getItem("users"))
}
if(localStorage.getItem("users") != null){
  loginSect.classList.add("d-none")
  mainData.classList.remove("d-none")
}else{
  loginSect.classList.remove("d-none")
  mainData.classList.add("d-none")
}

signUp.addEventListener("click",()=>{
  inpName.classList.remove("d-none")
  signUp.classList.add("d-none")
  signIn.classList.replace("d-none","d-block")
  btnSignUp.classList.remove("d-none")
  login.classList.add("d-none")
  userNameSp.classList.remove("d-none")
  
})
signIn.addEventListener("click",()=>{
  inpName.classList.add("d-none")
  signUp.classList.remove("d-none")
  signIn.classList.add("d-none")
  btnSignUp.classList.add("d-none")
  login.classList.remove("d-none")
  userNameSp.classList.add("d-none")
})



function userValidName(){
  let regex = /^[A-Za-z\s'-]{3,50}$/i;
  if(regex.test(inpName.value) == true && inpName.value != ""){
    return true;
  }else{
    return false;
  }
}
function userValidEmail(){
  let regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if(regex.test(inpEmail.value) == true && inpEmail.value != "" && isExist() != true){
    return true
  }else{
    return false;
  }
}
function userValidPass(){
  let regex =/^[A-Za-z0-9!@#$%^&*]{8,15}$/;
  if(regex.test(inpPass.value) == true && inpPass.value != ""){
    return true;
    
  }else{
    return false;
  }
}
btnSignUp.addEventListener("click",()=>{
  if(userInputValid()){
    let person = {
      code:inpName.value,
      email:inpEmail.value,
      pass:inpPass.value,
    }
    personData.push(person)
    localStorage.setItem("users",JSON.stringify(personData))
    mainData.classList.replace("d-none","d-block")
    loginSect.classList.add("d-none")
    clear()
  }else{
    return false;
  }


})
login.addEventListener("click",()=>{
  if((inpEmail.value  && !inpPass.value)|| (!inpEmail.value  && inpPass.value)||(!inpEmail.value  && !inpPass.value)){
    requMess.classList.replace("d-none","d-block")
    clear()
}
  personData = JSON.parse(localStorage.getItem("users"))
  for(let i = 0 ; i < personData.length ; i++){
    if(inpEmail.value == personData[i].email && inpPass.value == personData[i].pass){
      loginSect.classList.add("d-none")
      mainData.classList.remove("d-none")
    }else{
      alert("email not found!!")
      clear()
    }
  }
})

function userInputValid(){
  if(userValidName() &&  userValidEmail() && userValidPass() == true){
    return true;
    
  }else{
    // alert("not allawod...")
    let requMess = document.getElementById("requMess")
    requMess.classList.replace("d-none","d-block")
  }
}
function clear(){
  inpName.value = null;
  inpEmail.value = null;
  inpPass.value = null;
}
function isExist(){
  let isExistMess = document.getElementById("isExistMess")
  for(let i = 0 ; i < personData.length ; i++){
    if(personData[i].code.toLowerCase() == inpName.value.toLowerCase() || personData[i].email.toLowerCase()
    == inpEmail.value.toLowerCase()){
      isExistMess.classList.replace("d-none","d-block")
      return true;
    }else{
      return false;
    }
  }
}



let arr = [...links];

class Ui {
  // constructor(){

  //     // this.readData(index)
  // }
  async readData(index) {
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "066e21710bmsh82d3fb8c8e31335p1566aajsn83e6b5419fbf",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    const api = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${index}`,
      options
    );
    let respnse = await api.json();
    console.log(respnse);
    Array.from(respnse);
    let cartona = "";
    try {
      for (let i = 0; i < respnse.length; i++) {
        cartona += `
          <div  class="innerItem p-2 animate__animated animate__fadeIn" id="innerItemDetalis">
        <div class="item" data-id='${respnse[i].id}' id="nameItem" >
          <div >
            <div class="col">
              <div class="card h-100">
                <img src="${respnse[i].thumbnail}" class="card-img-top p-2" alt="...">
                <div class="card-body">
                  <div class="mainTitle p-2 d-flex justify-content-between align-items-center">
                    <h5 class="card-title">${respnse[i].title}</h5>
                    <a class="bg-info modfiyBtn">Free</a>
                  </div>
                  <p class="card-text p-1">${respnse[i].short_description}</p>
                </div>
                <div class="card-footer d-flex justify-content-between align-items-center">
                  <small>${respnse[i].genre}</small>
                  <small>${respnse[i].platform}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        
        `;
      }
      row.innerHTML = cartona;
      document.querySelectorAll(".item").forEach((item) => {
        item.addEventListener("click", function () {
          new Detalis(item.dataset.id);
        });
      });
      

      console.log(respnse);
    } catch (error) {
      console.log(error);
    }
  }
}

class Detalis {
  constructor(index) {
    this.detalis(index);
  }
  //detalis
  async detalis(index) {
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${index}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "066e21710bmsh82d3fb8c8e31335p1566aajsn83e6b5419fbf",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
      let dataOfDetalis = `
         <div class="innerDetalis">
            <div  class="Detalis">
              <div class="imgAndHead mt-2">
               <div  class="d-flex justify-content-between align-items-center dnameAndbClose">
                <h2>Detalis Game</h2>
                <i class="fa-solid fa-close close fs-5" id="close"></i>
               </div>
                <div  class="imgAndDetalis d-flex justify-content-center align-items-start mt-5" >
                  <div id="imgGameId"  class="imgGame w-100 "  >
                  
                    <img src="${result.thumbnail}" class="w-100 bg-info"  alt="" />
                  </div>
                  <div id="contentGameId"  class="contentGame ps-5 col-md-7">
                    <h2 class="h4" >Title: <span  class="bg-info rounded-2 text-black px-1">${result.title}</span></h2>
                    <p >Category: <span class="bg-info rounded-2 text-black p-1">${result.genre}</span></p>
                    <p>Platform: <span class="bg-info rounded-2 text-black p-1">${result.platform}</span></p>
                    <p>Status: <span class="bg-info rounded-2 text-black p-1">${result.status}</span></p>
                    <p>${result.description}</p>
                    <a  href="${result.game_url}" class="showData" target="_blank" >Show Game </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
`;
      detailsGame.innerHTML = dataOfDetalis;
      // Add event listener for the close button dynamically
      document.getElementById("close").addEventListener("click", function () {
        mainData.classList.replace("d-none","d-block")
        detalisInfo.classList.replace("d-block", "d-none");
      });

      // Show the details info and hide main data
      mainData.classList.add("d-none")
      detalisInfo.classList.replace("d-none", "d-block");
      let imgGameId = document.getElementById("imgGameId")
      let contentGameId = document.getElementById("contentGameId")
      gsap.to(imgGameId, { Animation:1, x: 5  });
      gsap.to(contentGameId, { Animation: 1, x: -7  });
      gsap.to(imgGameId, { Animation:1, y: 5  });
      gsap.to(contentGameId, { Animation: 1, y: -5  });
    } catch (error) {
      console.error(error);
    }
  }
}

arr.forEach((el) => {
  el.addEventListener("click", function () {
    let nameElement = el.innerHTML;
    let test = new Ui();
    test.readData(nameElement);
    document.querySelector(".active").classList.remove("active");
    this.classList.add("active");
  });
});

let test = new Ui();
test.readData("mmorpg");

