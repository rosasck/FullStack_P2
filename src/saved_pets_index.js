// To precompile this file with babble use the folowing command in the terminal:
//npx babel --watch src --out-dir . --presets react-app/prod

var petArray=[];


function addPet(petId){
  petArray.push(petId);
}

//import {setPetID, loadPet  } from "./pet-page.js";
const card = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: 8,
  width: 470,
  textAlign: 'center',
  margin: 25,
  backgroundColor: '#F4978E',
};
const petPic = {
  marginTop: 20,
  borderRadius: 8,
  width: 400,
  objectFit: 'cover',
};
const info= {
  width: 380,
  borderRadius: 8,
  padding: 15,
  margin: 15,
  backgroundColor: '#FBC4AB',
};
const petInfo = {
  width: 380,
  borderRadius: 8,
  padding: 15,
  margin: 15,
  backgroundColor: '#FBC4AB',
};
const petData = {
  backgroundColor:'#FBC4AB',
};



let id=0;

//Function to Open up the Pet page with more information about the
//saved Pet
function openPetPageForPet(petID) {
  window.location.href = `./pet-page.html?id=${petID}`;
}


//Function responsible for getting the pet with the PETid from the API 
//this allows us to keep track of saved pets:) 
function loadPets(petId){

     id = petId;
     let petIDUrl = `https://api.petfinder.com/v2/animals/${id}`;
     let token = localStorage.getItem('token');
     
     
     //this allows us to get the token validated from the API 
     if(!token){
      getToken()
      .then(response=>{token = localStorage.getItem('token');})
      .catch(err=>{
          console.log(`ERROR MESSAGE: ${err}`);
      });
  }
     fetch(petIDUrl, {
      headers:{
          'Authorization': `Bearer ${token}`,
  }})
  //actual response with the pet 
  .then(response=>{return response.json();})
  //parsing the data! 
  .then(data=>
      {
        if(data.status)
        {
            const error = new Error(data.title);
            error.code = data.status;
            throw error;
        }
           let pet = data.animal;
           let image = pet.photos[0] ? pet.photos[0].medium : "https://cdn.clipart.email/dd7ca471f7af2bb0f501a464970b2b1b_kawaii-cute-cat-face-drawing-cuteanimals_360-360.jpeg";
           let name = pet.name ? pet.name : "Unknown";

           const element = (
               <div style={card} className="card" onClick={()=> openPetPageForPet(petId)}>
                   <img style={petPic} src = {image} className = "pet-pic"/>
                   <div style={petInfo}  className = "pet-info-more">
                       <h1>>{name}</h1>
                   </div>
               </div>
           );


           //make this a creae element to append to the root element, This is how we can get 
           //more than one pet on this page :)
           ReactDOM.render(element, document.getElementById('rootS'));


      })
      .catch(error =>{
        if(error.code){
             console.log(`AHHHH ERROR STATUS: ${error.code} ERROR MESSAGE: ${error.message}`);
        }
        //If a token is expired, gets new authorization token & re-runs the function.
        else if(error.message.includes("Failed to fetch") || error.message.includes("NetworkError"))
        {
            getToken().then(loadPets(petId)).catch(err=>{console.log(err);});
        }
        else{
             console.log('ERROR MESSAGE: ', error.message);
         }
     });
 
    }
    
//goes through the saved pets array and displays them :) 
function allPets(){
 petArray.forEach(element => {
   loadPets(element);
  });
}

//TESTING Animals :) 
//addPet(47929706);
addPet(47567601);
addPet(47058934);
addPet(48097357);

//allPets();

