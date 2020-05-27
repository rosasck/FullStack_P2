//import 'bootstrap/dist/css/bootstrap.min.css';

const baseAnimalUrl = "https://api.petfinder.com/v2/animals?sort=random";
let animalUrl = baseAnimalUrl;
const card = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 8,
    width: 450,
    textAlign: 'center',
    margin: 25,
    backgroundColor: '#F4978E',
}
const heartColor = {
    color: '#F08080',
}
const petPic = {
    marginTop: 20,
    borderRadius: 8,
    width: 400,
    objectFit: 'cover',
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

class PetInfo extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            image: "https://cdn.clipart.email/dd7ca471f7af2bb0f501a464970b2b1b_kawaii-cute-cat-face-drawing-cuteanimals_360-360.jpeg",
            name: "No Name",
            description: "No Description",
            petId: 0,
        }
        this.petArray = null;
        this.index = 0;
        this.page = 1;
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
       var newImage, newName, newDesc, newId;

       /*** TO DO: GET FILTERS ***/

       //Fetches another page of results from API
       if(!this.petArray|| this.index >= this.petArray.length)
       {
           //Changes URL for next page of results
           if(this.petArray)
           {
               ++this.page;
               animalUrl = baseAnimalUrl + `&page=${this.page}`;
           }
           fetch(animalUrl, {
               headers:{
                   'Authorization': `Bearer ${token}`,
           }})
           .then(response=>{return response.json();})
           .then(data=>
               {
                   //Checks if there are any more animals to display
                   //If not, there will also be no more pages to look through.
                   /*** TO DO: Decide if the pets should repeat or just stop displaying after there are no more pages ***/
                   if(data.animals.length === 0)
                    throw new Error('No Animals');

                   this.petArray = data.animals;
                   this.index = 0;
                   let pet = data.animals[this.index];
                   newImage = pet.photos[0] ? pet.photos[0].medium : "https://cdn.clipart.email/dd7ca471f7af2bb0f501a464970b2b1b_kawaii-cute-cat-face-drawing-cuteanimals_360-360.jpeg";
                   newName = pet.name ? pet.name : "Unknown";
                   newDesc = pet.description ? pet.description : "";
                   newId = pet.id;
                   ++this.index;

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
       else
       {
           let pet = this.petArray[this.index];
           newImage = pet.photos[0] ? pet.photos[0].medium : "https://cdn.clipart.email/dd7ca471f7af2bb0f501a464970b2b1b_kawaii-cute-cat-face-drawing-cuteanimals_360-360.jpeg";
           newName = pet.name ? pet.name : "Unknown";
           newDesc = pet.description ? pet.description : "";
           newId = pet.id 
           ++this.index;

           this.setState(state => ({
                image: newImage,
                name: newName,
                description: newDesc,
                petId: newId,
            }));
       }
    }

    render(){
        return(
            <div className = "feed">
                <a className = "btn" href ="#" onClick = {this.handleClick}><i className="fas fa-heart-broken fa-5x"></i></a> 
                <div style = {card} className = "card">
                    <img style = {petPic} src = {this.state.image} alt = "A pet"/>
                    <div style = {petInfo} className = "pet-info">
                        <h1 style = {petData}>{this.state.name}</h1>
                        <p style = {petData}>{this.state.description}</p>
                    </div>
                </div>
                <a className = "btn" href ="#" onClick = {this.handleClick}><i style = {heartColor} className="fas fa-heart fa-5x"></i></a>
            </div>
        );
    }
}

ReactDOM.render(<PetInfo/>, document.getElementById('root'));