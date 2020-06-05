var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import 'bootstrap/dist/css/bootstrap.min.css';
/*
import React from 'react'
import ReactDOM from 'react-dom'
import {fetchToken} from './authorizationKey'
import {getToken} from './authorizationKey'
*/
var baseAnimalUrl = void 0;
var param = localStorage.getItem('parameters');
if (param) baseAnimalUrl = "https://api.petfinder.com/v2/animals?sort=recent&status=adoptable" + param;else baseAnimalUrl = "https://api.petfinder.com/v2/animals?sort=recent&status=adoptable";

var animalUrl = baseAnimalUrl;
var card = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: 8,
  width: 450,
  textAlign: "center",
  margin: 25,
  backgroundColor: "#F4978E"
};
var heartColor = {
  color: "#F08080"
};
var petPic = {
  marginTop: 20,
  borderRadius: 8,
  width: 400,
  objectFit: "cover"
};
var petInfo = {
  width: 380,
  borderRadius: 8,
  padding: 15,
  margin: 15,
  backgroundColor: "#FBC4AB"
};
var petData = {
  backgroundColor: "#FBC4AB"
};

var newId = 0;

var PetInfo = function (_React$Component) {
  _inherits(PetInfo, _React$Component);

  function PetInfo(props) {
    _classCallCheck(this, PetInfo);

    var _this = _possibleConstructorReturn(this, (PetInfo.__proto__ || Object.getPrototypeOf(PetInfo)).call(this, props));

    _this.state = {
      image: "https://cdn.clipart.email/dd7ca471f7af2bb0f501a464970b2b1b_kawaii-cute-cat-face-drawing-cuteanimals_360-360.jpeg",
      name: "Loading Name...",
      description: "Loading Description...",
      petId: 0
    };
    _this.petArray = null;
    _this.index = 0;
    _this.page = 1;
    _this.handleClick = _this.handleClick.bind(_this);
    _this.openPetPage = _this.openPetPage.bind(_this);
    _this.callSavedPets = _this.callSavedPets.bind(_this);
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
      getToken().then(_this.handleClick()).catch(function (err) {
        console.log("Failed in constructor: " + err);
      });
    } else {
      _this.handleClick();
    }
    return _this;
  }
  //Loads a pet's info into the feed


  _createClass(PetInfo, [{
    key: "handleClick",
    value: function handleClick() {
      var _this2 = this;

      var newImage = void 0,
          newName = void 0,
          newDesc = void 0;

      var token = localStorage.getItem('token');

      //Fetches another page of results from API
      if (!this.petArray || this.index >= this.petArray.length) {
        //Changes URL for next page of results
        if (this.petArray) {
          ++this.page;
          animalUrl = baseAnimalUrl + ("&page=" + this.page);
        }

        //Makes a GET request for that page.
        try {

          fetch(animalUrl, {
            headers: {
              Authorization: "Bearer " + token
            }
          }).then(function (response) {
            return response.json();
          }).then(function (data) {
            //Checks if there are any more animals to display
            //If not, there will also be no more pages to look through.
            /*** TO DO: Decide if the pets should repeat or just stop displaying after there are no more pages ***/
            if (!data.animals || data.animals.length === 0) throw new Error("No Animals");

            _this2.petArray = data.animals;
            _this2.index = 0;
            var pet = data.animals[_this2.index];
            newImage = pet.photos[0] ? pet.photos[0].medium : "https://cdn.clipart.email/dd7ca471f7af2bb0f501a464970b2b1b_kawaii-cute-cat-face-drawing-cuteanimals_360-360.jpeg";
            newName = pet.name ? formatString(pet.name) : "Unknown";
            //The description needs to be modified to replace
            newDesc = pet.description ? formatString(pet.description) : "";
            newId = pet.id;
            ++_this2.index;

            _this2.setState(function (state) {
              return {
                image: newImage,
                name: newName,
                description: newDesc,
                petId: newId
              };
            });
          }).catch(function (error) {
            //Handles if an authorization token has expired.
            if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
              //This calls handleClick multiple times before the getToken finishes for some reason...
              //This needs to be fixed. It is most liky something to do with changing the state in react, but IDK
              getToken().then(_this2.handleClick()).catch(function (err) {
                console.log("ERROR MESSAGE: " + err);
              });
            } else {
              console.log("ERROR MESSAGE: ", error.message);
            }
          });
        } catch (error) {
          getToken().then(this.handleClick()).catch(function (err) {
            console.log(err);
          });
        }
      } else {
        var pet = this.petArray[this.index];
        newImage = pet.photos[0] ? pet.photos[0].medium : "https://cdn.clipart.email/dd7ca471f7af2bb0f501a464970b2b1b_kawaii-cute-cat-face-drawing-cuteanimals_360-360.jpeg";
        newName = pet.name ? formatString(pet.name) : "Unknown";
        //The description needs to be modified to replace
        newDesc = pet.description ? formatString(pet.description) : "";
        newId = pet.id;
        ++this.index;

        this.setState(function (state) {
          return {
            image: newImage,
            name: newName,
            description: newDesc,
            petId: newId
          };
        });
      }
    }
  }, {
    key: "openPetPage",
    value: function openPetPage() {
      window.location.href = "./pet-page.html?id=" + this.state.petId;
    }
  }, {
    key: "callSavedPets",
    value: function callSavedPets() {
      console.log("Adding a pet to saved pets");
      console.log(newId);
      addPet(newId);
      this.handleClick();
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "feed" },
        React.createElement(
          "a",
          { className: "btn", href: "#", onClick: this.handleClick },
          React.createElement("i", { className: "fas fa-heart-broken fa-5x" })
        ),
        React.createElement(
          "div",
          { style: card, className: "card", onClick: this.openPetPage },
          React.createElement("img", { style: petPic, src: this.state.image, alt: "A pet" }),
          React.createElement(
            "div",
            { style: petInfo, className: "pet-info" },
            React.createElement(
              "h1",
              { style: petData },
              this.state.name
            ),
            React.createElement(
              "p",
              { style: petData },
              this.state.description
            )
          )
        ),
        React.createElement(
          "a",
          { className: "btn", href: "#", onClick: this.callSavedPets },
          React.createElement("i", { className: "fas fa-heart fa-5x" })
        )
      );
    }
  }]);

  return PetInfo;
}(React.Component);

ReactDOM.render(React.createElement(PetInfo, null), document.getElementById("root"));