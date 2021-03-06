let baseAnimalUrl;

//If the user has added filters, adds the filters to the search
let param = localStorage.getItem('parameters');
if(param)
  baseAnimalUrl = `https://api.petfinder.com/v2/animals?sort=recent&status=adoptable${param}`;
else
  baseAnimalUrl = "https://api.petfinder.com/v2/animals?sort=recent&status=adoptable";

let animalUrl = baseAnimalUrl;
const card = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: 8,
  width: 450,
  textAlign: "center",
  margin: 25,
  backgroundColor: "#F4978E",
};
const heartColor = {
  color: "#F08080",
};
const petPic = {
  marginTop: 20,
  borderRadius: 8,
  width: 400,
  height: 400,
  objectFit: "cover",
};
const petInfo = {
  width: 380,
  borderRadius: 8,
  padding: 15,
  margin: 15,
  backgroundColor: "#FBC4AB",
};
const petData = {
  backgroundColor: "#FBC4AB",
};

let newId=0;
class PetInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image:
        "https://cdn.clipart.email/dd7ca471f7af2bb0f501a464970b2b1b_kawaii-cute-cat-face-drawing-cuteanimals_360-360.jpeg",
      name: "Loading Name...",
      description: "Loading Description...",
      petId: 0,
    };
    this.petArray = null;
    this.index = 0;
    this.page = 1;
    this.handleClick = this.handleClick.bind(this);
    this.openPetPage = this.openPetPage.bind(this);
    this.callSavedPets= this.callSavedPets.bind(this);
    /*
        if(!getToken()){
            fetchToken()
            //.then(resolve=>{console.log(`test:${getToken()}`)})
            .then(this.handleClick())
            .catch(err=>{
                console.log(`ERROR MESSAGE: ${err}`);
            });
        }
        else{
            console.log(`fail`);
        }*/
    if (!localStorage.getItem('token')) {
      getToken()
      .then(this.handleClick())
      .catch((err) => {
        console.log(`Failed in constructor: ${err}`);
      });
    } 
    else {
      this.handleClick();
    }
  }

  //Loads a pet's info into the feed
  handleClick() {
    if(this.state.petId !== null){
    let newImage, newName, newDesc;

    let token = localStorage.getItem('token');

    //Fetches another page of results from API
    if (!this.petArray || this.index >= this.petArray.length) {
      //Changes URL for next page of results
      if (this.petArray) {
        ++this.page;
        animalUrl = baseAnimalUrl + `&page=${this.page}`;
      }

      //Makes a GET request for that page.
      try{
      fetch(animalUrl, {
        mode: "cors",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          //Checks if there are any more animals to display
          //If not, there will also be no more pages to look through.
          console.log(data);
          if (!data.animals) 
            throw new Error(`Status Code: ${data.status}   Failed to Fetch`);
          else if(data.animals.length === 0) 
          {
            this.setState((state) => ({
              image: "https://cdn.clipart.email/dd7ca471f7af2bb0f501a464970b2b1b_kawaii-cute-cat-face-drawing-cuteanimals_360-360.jpeg",
              name: "No Pets Found",
              description: "Try changing you filters in the settings page.",
              petId: null,
            }));
            throw new Error("No Animals");
          }

          this.petArray = data.animals;
          this.index = 0;
          let pet = data.animals[this.index];
          newImage = pet.photos[0]
            ? pet.photos[0].medium
            : "https://cdn.clipart.email/dd7ca471f7af2bb0f501a464970b2b1b_kawaii-cute-cat-face-drawing-cuteanimals_360-360.jpeg";
          newName = pet.name ? formatString(pet.name) : "Unknown";
          //The description needs to be modified to replace
          newDesc = pet.description ? formatString(pet.description) : "";
          newId = pet.id;
          ++this.index;

          this.setState((state) => ({
            image: newImage,
            name: newName,
            description: newDesc,
            petId: newId,
          }));
        })
        .catch((error) => {
          //Handles if an authorization token has expired.
          if (error.message.includes("Status Code: 401   Failed to Fetch")){
            //This calls handleClick multiple times before the getToken finishes for some reason...
            //This needs to be fixed. It is most liky something to do with changing the state in react, but IDK
            console.log(error.message);
            getToken()
              .then(this.handleClick())
              .catch((err) => {
                console.log(`ERROR MESSAGE: ${err}`);
              });
          } else {
            console.log("ERROR MESSAGE: ", error.message);
          }
        });
      }catch(error)
      {
        getToken()
        .then(this.handleClick())
        .catch((err) => {
          console.log(err);
        });
      }
    } else {
      let pet = this.petArray[this.index];
      newImage = pet.photos[0]
        ? pet.photos[0].medium
        : "https://cdn.clipart.email/dd7ca471f7af2bb0f501a464970b2b1b_kawaii-cute-cat-face-drawing-cuteanimals_360-360.jpeg";
      newName = pet.name ? formatString(pet.name) : "Unknown";
      newDesc = pet.description ? formatString(pet.description) : "";
      newId = pet.id;
      ++this.index;

      this.setState((state) => ({
        image: newImage,
        name: newName,
        description: newDesc,
        petId: newId,
      }));
    }
  }
  }

  //Opens Individual Pet Page
  openPetPage() {
    if(this.state.petId)
      window.location.href = `./pet-page.html?id=${this.state.petId}`;
  }

  //Saves Pet
  callSavedPets(){
    if(newId){
    console.log("Adding a pet to saved pets")
   console.log(newId);
    addPet(newId);
    this.handleClick();
    }
  }

  render() {
    return (
      <div className="feed">
        <a className="btn" href="#" onClick={this.handleClick}>
          <i className="fas fa-heart-broken fa-5x"></i>
        </a>
        <div style={card} className="card" onClick={this.openPetPage}>
          <img style={petPic} src={this.state.image} alt="A pet" />
          <div style={petInfo} className="pet-info">
            <div className= "title-small" style={petData}>{this.state.name}</div>
            <p style={petData}>{this.state.description}</p>
          </div>
        </div>
        <a className="btn" href="#" onClick={this.callSavedPets}>  
          <i className="fas fa-heart fa-5x"></i>
        </a>
      </div>
    );
  }
}

ReactDOM.render(<PetInfo />, document.getElementById("root"));