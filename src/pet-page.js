//Here is a valid pet id to test with 48088956.

//This fucntion should only be called by pet-page.html.
//It uses the url of the pet-page to load a pet into the root of pet-page.html.
//The url should contain a parameter with the id of the desired pet to be displayed.
//ex. https://pet-tential.herokuapp.com/pet-page.html?id=47964823/
function loadPet() {
  // Gets the ID to display from the URL for pet-page.html
  let pageUrl = window.location.href.split("id=");
  let id = pageUrl[1];

  //If no ID as parameter, dispalys error message on screen.
  //Otherwise fetches & displays pet info
  if (!id) {
    const element = (
      <div>
        <h1>Oh no... We don't know what pet you want to look at!</h1>
        <p>
          This is most likely an issue on our end. Hopefully it will be resolved
          soon!{" "}
        </p>
      </div>
    );

    ReactDOM.render(element, document.getElementById("root"));
  } else {
    let petIDUrl = `https://api.petfinder.com/v2/animals/${id}`;
    let token = localStorage.getItem('token');

    try{
    fetch(petIDUrl, {

      mode: "cors",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);

        // Checks if an error occured during GET request & throws a corresponding error.
        if (data.status) {
          const error = new Error(data.title);
          error.code = data.status;
          throw error;
        }

        // Renders pet information. This should be updated later to have more info.
        let pet = data.animal;
        let image = pet.photos[0]
          ? pet.photos[0].medium
          : "https://cdn.clipart.email/dd7ca471f7af2bb0f501a464970b2b1b_kawaii-cute-cat-face-drawing-cuteanimals_360-360.jpeg";
        let name = pet.name ? formatString(pet.name) : "Unknown";
        //The description needs to be modified to replace
        let desc = pet.description ? formatString(pet.description) : "";
        const element = (
          <div className = "more">
            <div className="pet-info-container">
              <img src={image} className="pet-pic" />
              <div className="pet-info-more">
                <div className= "title-small">{name}</div>
                <div className = "more-text">{desc}</div>
              </div>
            </div>
          </div>
        );
        ReactDOM.render(element, document.getElementById("root"));
      })
      .catch((error) => {
        if (error.code == 404) {
          const element = (
            <div>
              <h1>404 Error</h1>
              <p>
                The pet you are looking for could not be found. It may have
                gotten adopted.
              </p>
            </div>
          );

          ReactDOM.render(element, document.getElementById("root"));
        } else if (error.code) {
          console.log(
            `ERROR STATUS: ${error.code} ERROR MESSAGE: ${error.message}`
          );
        }
        //If a token is expired, gets new authorization token & re-runs the function.
        else if (error.message.includes("Failed to fetch")) {
          getToken()
            .then(loadPet)
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("ERROR MESSAGE: ", error.message);
        }
      });
    }catch(error)
    {
      getToken()
      .then(loadPet)
      .catch((err) => {
        console.log(err);
      });
    }
  }
}
