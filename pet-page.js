//Here is a valid pet id to test with 47929706.

function loadPet() {
  var pageUrl = window.location.href.split("id=");
  var id = pageUrl[1];
  if (!id) {
    var element = React.createElement(
      "div",
      null,
      React.createElement(
        "h1",
        null,
        "Oh no... We don't know what pet you want to look at!"
      ),
      React.createElement(
        "p",
        null,
        "This is most likely an issue on our end. Hopefully it will be resolved soon!",
        " "
      )
    );

    ReactDOM.render(element, document.getElementById("root"));
  } else {
    var petIDUrl = "https://api.petfinder.com/v2/animals/" + id;
    fetch(petIDUrl, {
      headers: {
        Authorization: "Bearer " + token
      }
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data);

      // Checks if an error occured during GET request & throws a corresponding error.
      if (data.status) {
        var error = new Error(data.title);
        error.code = data.status;
        throw error;
      }

      // Renders pet information. This should be updated later to have more info.
      var pet = data.animal;
      var image = pet.photos[0] ? pet.photos[0].medium : "https://cdn.clipart.email/dd7ca471f7af2bb0f501a464970b2b1b_kawaii-cute-cat-face-drawing-cuteanimals_360-360.jpeg";
      var name = pet.name ? pet.name : "Unknown";
      //The description needs to be modified to replace
      var desc = pet.description ? pet.description : "";
      var element = React.createElement(
        "div",
        null,
        React.createElement("img", { src: image, className: "pet-pic" }),
        React.createElement(
          "div",
          { className: "pet-info-more" },
          React.createElement(
            "h1",
            null,
            name
          ),
          React.createElement(
            "p",
            null,
            desc
          )
        )
      );
      ReactDOM.render(element, document.getElementById("root"));
    }).catch(function (error) {
      if (error.code == 404) {
        var _element = React.createElement(
          "div",
          null,
          React.createElement(
            "h1",
            null,
            "404 Error"
          ),
          React.createElement(
            "p",
            null,
            "The pet you are looking for could not be found. It may have gotten adopted."
          )
        );

        ReactDOM.render(_element, document.getElementById("root"));
      } else if (error.code) {
        console.log("ERROR STATUS: " + error.code + " ERROR MESSAGE: " + error.message);
      }
      //If a token is expired, gets new authorization token & re-runs the function.
      else if (error.message.includes("Failed to fetch")) {
          getToken().then(loadPet).catch(function (err) {
            console.log(err);
          });
        } else {
          console.log("ERROR MESSAGE: ", error.message);
        }
    });
  }
}