
const baseAnimalUrl = "https://api.petfinder.com/v2/animals?sort=random";
let animalUrl = baseAnimalUrl;
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
}
const picture = {
  marginTop: 20,
  borderRadius: 8,
  width: 400,
  objectFit: 'cover',
}
const info= {
  width: 380,
  borderRadius: 8,
  padding: 15,
  margin: 15,
  backgroundColor: '#FBC4AB',
}
const petInfo = {
  width: 380,
  borderRadius: 8,
  padding: 15,
  margin: 15,
  backgroundColor: '#FBC4AB',
}
const petData = {
  backgroundColor:'#FBC4AB',
}

class SavedPets extends React.Component{
  constructor(props)
  {
      super(props);
      this.state = {
          image: "https://cdn.clipart.email/dd7ca471f7af2bb0f501a464970b2b1b_kawaii-cute-cat-face-drawing-cuteanimals_360-360.jpeg",
          name: "No Name",
          description: "No Description",
          petId: 0,
      }
  } 


loadPets(){
      animalUrl = baseAnimalUrl + `&page=${this.page}`;
  fetch(animalUrl, {
      headers:{
          'Authorization': `Bearer ${token}`,
  }})

  .then(response=>{return response.json();})
  .then(data=>
      {
          //Checks if there are any more animals to display
          //If not, there will also be no more pages to look through.
          //TO DO: Decide if the pets should repeat or just stop displaying after there are no more pages 
          if(data.animals.length === 0)
           throw new Error('No Animals');

          this.petArray = data.animals;
          this.index = 0;
          let pet = data.animals[this.index];
          newImage = pet.photos[0] ? pet.photos[0].medium : "https://cdn.clipart.email/dd7ca471f7af2bb0f501a464970b2b1b_kawaii-cute-cat-face-drawing-cuteanimals_360-360.jpeg";
          newName = pet.name ? pet.name : "Unknown";
          //The description needs to be modified to replace 
          newDesc = pet.description ? pet.description : "";
          newId = pet.id;
          ++this.index;
          
          
          //Calling the setPetID function to call the load pet page
         // setPetID(newId);


          this.setState(state => ({
           image: newImage,
           name: newName,
           description: newDesc,
           petId: newId,
       }));
      })
  .catch(error=>{
      //This is a bad way of checking if a token is expired, but I cant figure out any other information 
      //about the errors sent other than the message
      if(error.message.includes("Failed to fetch"))
       {
           getToken();
       }
       else{
           console.log('ERROR MESSAGE: ', error.message);
       }
   });

}



  render(){
    return(
      //this needs to have a for loop to load cards for the number of rows 
      //based on the php num rows 

                //<a className = "btn" href ="#" onClick= {loadPet()}>More Info</a>
        <div className = "savedPetsPlace">
            <div style = {card} className = "card">
                <img style = {picture} src = {this.state.image} alt = "A pet"/>
                <div style = {petInfo} className = "pet-info">
                        <h1 style = {petData}>{this.state.name}</h1>
                        <p style = {petData}>{this.state.description}</p>
                </div>
            </div>
        </div>
    );
}


}
ReactDOM.render(<SavedPets/>, document.getElementById('root'));