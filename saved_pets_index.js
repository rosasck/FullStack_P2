

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

/*class SavedPets extends React.Component{
  constructor(props)
  {
      super(props);
      this.state = {
          image: "https://cdn.clipart.email/dd7ca471f7af2bb0f501a464970b2b1b_kawaii-cute-cat-face-drawing-cuteanimals_360-360.jpeg",
          name: "No Name",
          petId: 0,
      }
  } 


*/


function loadPets(petId){
     let id = petId;
     let petIDUrl = `https://api.petfinder.com/v2/animals/${id}`;
  fetch(petIDUrl, {
      headers:{
          'Authorization': `Bearer ${token}`,
  }})

  .then(response=>{return response.json();})
  .then(data=>
      {


        console.log(data);

        // Checks if an error occured during GET request & throws a corresponding error.
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
               <div>
                   <img src = {image} className = "pet-pic"/>
                   <div className = "pet-info-more">
                       <h1>{name}</h1>
                       <p>{desc}</p>
                   </div>
               </div>
           );
           ReactDOM.render(element, document.getElementById('root'));
      })
      .catch(error=>{
        /*
        if(error.code == 404)
        {
            const element = (
                <div>
                    <h1>404 Error</h1>
                    <p> THIS SHOULDNT DISPLAY The pet you are looking for could not be found. It may have gotten adopted.</p>
                </div>
            );
    
            ReactDOM.render(element, element, document.getElementById('root'));
        }
        else */
        if(error.code){
             console.log(`AHHHH ERROR STATUS: ${error.code} ERROR MESSAGE: ${error.message}`);
        }
        //If a token is expired, gets new authorization token & re-runs the function.
        else if(error.message.includes("Failed to fetch"))
        {
            getToken().then(loadPet(petId)).catch(err=>{console.log(err);});
        }
        else{
             console.log('ERROR MESSAGE: ', error.message);
         }
      
        //This is a bad way of checking if a token is expired, but I cant figure out any other information 
        //about the errors sent other than the message
     });
  
  }
    

         // this.petArray = data.animals;
          //index = 0;
          /*/let pet = data.animals[this.index];
          newImage = pet.photos[0] ? pet.photos[0].medium : "https://cdn.clipart.email/dd7ca471f7af2bb0f501a464970b2b1b_kawaii-cute-cat-face-drawing-cuteanimals_360-360.jpeg";
          newName = pet.name ? pet.name : "Unknown";
          //The description needs to be modified to replace 
          newId = pet.id;
          ++this.index;
          
          
          //Calling the setPetID function to call the load pet page
         // setPetID(newId);


          this.setState(state => ({
           image: newImage,
           name: newName,
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

    // loadPets(47929706);
    return(

     function petDBInsert($petid){
      $('.button').click(function() {
        $.ajax({
          type: "POST",
          url: "db.php",
          data: { petid: "" }
        }).done(function( msg ) {
          alert( "Data Saved: " + msg );
        });
      });
var idpet= 
 var phpadd= <?php echo petDBInsert(idpet);?> //call the php add function
  var phpmult= <?php echo mult(1,2);?> //call the php mult function
  var phpdivide= <?php echo divide(1,2);?> //call the php divide function 
      */
      //this needs to have a for loop to load cards for the number of rows 
      //based on the php num rows 

                //<a className = "btn" href ="#" onClick= {loadPet()}>More Info</a>
      //  for(int i=0; i< petArray.length(); i++)
        //{
         /*
        <div className = "savedPetsPlace">
            <div style = {card} className = "card">
                <img style = {picture} src = {this.state.image} alt = "A pet"/>
                <div style = {petInfo} className = "pet-info">
                        <h1 style = {petData}>{this.state.name}</h1>
                        <a className = "btn" href ="#" >More Info</a>
                </div>
            </div>



            <div style = {card} className = "card">
                <img style = {picture} src = {this.state.image} alt = "A pet"/>
                <div style = {petInfo} className = "pet-info">
                        <h1 style = {petData}>{this.state.name}</h1>
                        <a className = "btn" href ="#" >More Info</a>
                </div>
            </div>


            <div style = {card} className = "card">
                <img style = {picture} src = {this.state.image} alt = "A pet"/>
                <div style = {petInfo} className = "pet-info">
                        <h1 style = {petData}>{this.state.name}</h1>
                        <a className = "btn" href ="#" >More Info</a>
                </div>
            </div>


            <div style = {card} className = "card">
                <img style = {picture} src = {this.state.image} alt = "A pet"/>
                <div style = {petInfo} className = "pet-info">
                        <h1 style = {petData}>{this.state.name}</h1>
                        <a className = "btn" href ="#" >More Info</a>
                </div>
            </div>

        </div>
        //}
        
    );
    
}


}
*/
//ReactDOM.render(<SavedPets/>, document.getElementById('root'));
//}
/*
function allPets(){
 petArray.forEach(element => {
    this.loadPets(element);
  });
}
addPet(47929706);
allPets();
*/
loadPets(48047754);