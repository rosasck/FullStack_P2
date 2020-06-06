// To precompile this file with babble use the folowing command in the terminal:
//npx babel --watch src --out-dir . --presets react-app/prod


//this is used for the local storage array 
let petArray=[];

//this adds a pet to the local storage for the user 
function addPet(petId){

  petArray=JSON.parse(localStorage.getItem('savedPetsArray'));
  console.log("pet added to saved pets");
  petArray.push(petId);
  localStorage.setItem('savedPetsArray', JSON.stringify(petArray));

}



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


//petID var used in other functions needed to be global scope 
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


  //this was for testing token and petID 
  //console.log(token);
  //console.log(petIDUrl);

//This fetches the pet with the given petID 
     fetch(petIDUrl,  {
        mode: "cors",

      headers:{'Authorization': `Bearer ${token}`,
  }})
  .then(response=>{return response.json();})
  .then(data=>
   {
        if(data.status)
        {
            const error = new Error(data.title);
            error.code = data.status;
            throw error;
        }

        // info displayed for the pet on the saved pet page 
           let pet = data.animal;
           let image = pet.photos[0] ? pet.photos[0].medium : "https://cdn.clipart.email/dd7ca471f7af2bb0f501a464970b2b1b_kawaii-cute-cat-face-drawing-cuteanimals_360-360.jpeg";
           let name = pet.name ? pet.name : "Unknown";

          //this creates the element that the pet will be displayed on 
            var p= document.createElement('p' );

            //this is where the entire saved pets display is created 
           p.innerHTML = ` <img src=${image} width=\"200px\" height=\"150px\"> Pet Name: ${name} <br>  More Info: <a href='./pet-page.html?id=${petId}' >Click Here</a>`;

           //this is the way the styling worked for the saved pets! 
           p.style.backgroundColor="#FBC4AB";
           p.style.width="200px";
           p.style.borderRadius="8px";
           p.style.padding="15px";
           p.style.margin="15px";
           p.style.alignItems="center";
           p.style.alignContent="center";

           //this is how the element is appended on to the page 
             document.getElementById("rootSa").appendChild(p);

      })
      .catch(error =>{
        if(error.code && error.code != 401){
             console.log(`AHHHH ERROR STATUS: ${error.code} ERROR MESSAGE: ${error.message}`);
        }
        //If a token is expired, gets new authorization token & re-runs the function.
        else if( error.code == 401 || error.message.includes("Failed to fetch") || error.message.includes("NetworkError"))
        {
            getToken().then(loadPets(petId)).catch(err=>{console.log(err);});
        }
        else{
             console.log('ERROR MESSAGE: ', error.message);
         }
     });
 
    }
    
//goes through the saved pets array and displays them and call the load pet function 
function allPets(){
//grabs the pets from the local storage
 petArray=JSON.parse(localStorage.getItem('savedPetsArray'));

 //makes sure its not null so it doesnt give us issues
 if(petArray == null) return;


 //goes through thr array and calls load pets on it 
 else{petArray.forEach(element => {
   loadPets(element);
   console.log(petArray);
  });
}
}

/*
This function was used to clear the array inside of the local storage! 
KEEP THIS FUNCTION EVEN THO ITS COMMENTED OUT FOR DEMO 
function clearArray(){
  localStorage.removeItem('savedPetsArray');
}
*/


//this is what gets called at the moment this page loads to load all the saved pets 
allPets();

