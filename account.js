function test() {
    var zipcode = document.getElementById("zipcode").value;
    var distance = document.getElementById("distance").value;
    var type = document.getElementById("type").value;
    var gender = document.getElementById("gender").value;
    var size = document.getElementById("size").value;
    var age = document.getElementById("age").value;

    // array of serach items is returned for breed, color, coat
    var breed = $('#breed').val();
    var color = $('#color').val();
    var coat = $('#coat').val();

    var good_with_cats = document.getElementById("good_with_cats").checked;
    var good_with_dogs = document.getElementById("good_with_dogs").checked;
    var good_with_children = document.getElementById("good_with_children").checked;


    //console.log("name: " + name);
    //console.log("email: " + email);
    //console.log("comments: " + comments);
    //console.log("newsletter: " + newsletter);

    // testing: 
    alert("Zipcode: " + zipcode + " distance: " + distance + " type: " + type 
    + " gender: " + gender + " size: " + size + " age: " + age + " good with cats: " + good_with_cats
    + " good with dogs: " + good_with_dogs + " good with children: " + good_with_children
    + " breeds: " + breed + " colors: " + color + " coats: " + coat);
}

//NEED FUNCTION TO LOAD SAVED FILTERS FROM PARAMETERS

function updateFilters() {
    let param = "";

    /*zipcode & distance should probably pair together*/
    //Veryify zipcode is 5 characters
    var zipcode = document.getElementById("zipcode").value;
    var distance = document.getElementById("distance").value;
    if(zipcode)
    {
        if(zipcode.length != 5)
            alert("INVALID ZIPCODE");
        else
        {
            
            param += `&location=${zipcode}`;
            param += `&distance=${distance}`;
        }
    }

    var gender = document.getElementById("gender").value;
    if(gender)
        param += `&gender=${gender}`;

    var size = document.getElementById("size").value;
    if(size)
        param += `&size=${size}`;

    var age = document.getElementById("age").value;
    if(age)
        param += `&age=${age}`;

    var good_with_cats = document.getElementById("good_with_cats").checked;
    if(good_with_cats)
        param += `&good_with_cats=${good_with_cats}`;

    var good_with_dogs = document.getElementById("good_with_dogs").checked;
    if(good_with_dogs)
        param += `&good_with_dogs=${good_with_dogs}`;

    var good_with_children = document.getElementById("good_with_children").checked;
    if(good_with_children)
        param += `&good_with_children=${good_with_children}`

    //Look up possible animals & add them 
    var type = document.getElementById("type").value;

    // array of serach items is returned for breed, color, coat
    //Validate through API
    var breed = $('#breed').val();
    var colors = $('#color').val();
    var coat = $('#coat').val();

    const getAnimalTypeURL = "https://api.petfinder.com/v2/types";
    fetch(getAnimalTypeURL, {
        headers: {
        Authorization: "Bearer " + token
        }
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
            // A dictionary to map the type of data to any invalid data items provided by the user
        //This will be used to display an error message of all invalid data provided.
        let invalidData = {
            Breed: [],
            Colors: [],
            Coat: [],
        };
        const validData = data.types;
        let savedColors = [];
        let foundColors = [];
        var allowedValues;
        console.log(type);
        switch(type){
            case "Dog":

                param += "&type=Dog";
                allowedValues = validData[0];

                if(!allowedValues)
                {
                    alert("We are not able to validate any colors, breeds, or coats selected at this time. They will not be added as filters.")
                }
                else
                {
                    if(breed && breed.length > 0)
                    {
                        
                    }

                    let returnVal = validateColor(allowedValues.colors, colors, invalidData, param);
                    invalidData = returnVal.invalidData;
                    param = returnVal.param

                    if(coat && coat.length > 0)
                    {

                    }
                }
                break;
            case "Cat":
                param += "&type=Cat";
                allowedValues = validData[1];

                if(!allowedValues)
                {
                    alert("We are not able to validate any colors, breeds, or coats selected at this time. They will not be added as filters.")
                }
                else
                {
                    if(breed && breed.length > 0)
                    {
                        
                    }

                    let returnVal = validateColor(allowedValues.colors, colors, invalidData, param);;
                    invalidData = returnVal.invalidData;
                    param = returnVal.param

                    if(coat && coat.length > 0)
                    {

                    }
                }
                break;
            case "Rabbit":
                param += '&type=Rabbit';
                allowedValues = validData[2];

                if(!allowedValues)
                {
                    alert("We are not able to validate any colors, breeds, or coats selected at this time. They will not be added as filters.")
                }
                else
                {
                    if(breed && breed.length > 0)
                    {
                        
                    }

                    let returnVal = validateColor(allowedValues.colors, colors, invalidData, param);
                    invalidData = returnVal.invalidData;
                    param = returnVal.param

                    if(coat && coat.length > 0)
                    {

                    }
                }
                break;
            case "Small & Furry":
                param += `&type=${encodeURIComponent('Small & Furry')}`;
                allowedValues = validData[3];

                if(!allowedValues)
                {
                    alert("We are not able to validate any colors, breeds, or coats selected at this time. They will not be added as filters.")
                }
                else
                {
                    if(breed && breed.length > 0)
                    {
                        
                    }

                    let returnVal = validateColor(allowedValues.colors, colors, invalidData, param);
                    invalidData = returnVal.invalidData;
                    param = returnVal.param

                    if(coat && coat.length > 0)
                    {

                    }
                }
                break;
            case "Horse":
                param += "&type=Horse";
                allowedValues = validData[4];

                if(!allowedValues)
                {
                    alert("We are not able to validate any colors, breeds, or coats selected at this time. They will not be added as filters.")
                }
                else
                {
                    if(breed && breed.length > 0)
                    {
                        
                    }

                    let returnVal = validateColor(allowedValues.colors, colors, invalidData, param);
                    invalidData = returnVal.invalidData;
                    param = returnVal.param

                    if(coat && coat.length > 0)
                    {

                    }
                }
                break;
            case "Bird":
                param += '&type=Bird';
                allowedValues = validData[5];

                if(!allowedValues)
                {
                    alert("We are not able to validate any colors, breeds, or coats selected at this time. They will not be added as filters.")
                }
                else
                {
                    if(breed && breed.length > 0)
                    {
                        
                    }

                    let returnVal = validateColor(allowedValues.colors, colors, invalidData, param);
                    invalidData = returnVal.invalidData;
                    param = returnVal.param

                    if(coat && coat.length > 0)
                    {

                    }
                }
                break;
            case "Scales, Fins & Other":
                param += `&type=${encodeURIComponent('Scales, Fins & Other')}`;
                allowedValues = validData[6];

                if(!allowedValues)
                {
                    alert("We are not able to validate any colors, breeds, or coats selected at this time. They will not be added as filters.")
                }
                else
                {
                    if(breed && breed.length > 0)
                    {
                        
                    }

                    let returnVal = validateColor(allowedValues.colors, colors, invalidData, param);
                    invalidData = returnVal.invalidData;
                    param = returnVal.param

                    if(coat && coat.length > 0)
                    {

                    }
                }
                break;
            case "Barnyard":
                param += '&type=Barnyard';
                allowedValues = validData[7];

                if(!allowedValues)
                {
                    alert("We are not able to validate any colors, breeds, or coats selected at this time. They will not be added as filters.")
                }
                else
                {
                    if(breed && breed.length > 0)
                    {
                        
                    }

                    let returnVal = validateColor(allowedValues.colors, colors, invalidData, param);
                    invalidData = returnVal.invalidData;
                    param = returnVal.param

                    if(coat && coat.length > 0)
                    {

                    }
                }
                break;
            default:
                let validColors = [];
                //let validBreeds;
                //let validCoat;
                if(!validData)
                {
                    alert("We are not able to validate any colors, breeds, or coats selected at this time. They will not be added as filters.")
                }
                else
                {
                    for(let i = 0; i < validData.length; ++i)
                    {
                        //validBreeds.concat(validData[i].breeds)
                        validColors = validColors.concat(validData[i].colors);
                    }

                    if(breed && breed.length > 0)
                    {
                        
                    }

                    let returnVal = validateColor(validColors, colors, invalidData, param);
                    invalidData = returnVal.invalidData;
                    param = returnVal.param

                    if(coat && coat.length > 0)
                    {

                    }
                }
                break;

        }
            
            console.log(param);
            localStorage.setItem("parameters", param);
            
    })
    .catch(function (error) {
        if (error.code) {
        console.log("ERROR STATUS: " + error.code + " ERROR MESSAGE: " + error.message);
        }
        //If a token is expired, gets new authorization token & re-runs the function.
        else if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
            getToken().then(updateFilters()).catch((err)=>{
            console.log(err);
            });
        } else {
            console.log("ERROR MESSAGE: ", error.message);
        }
    });
}

function formatCapitilization(array){
    for(let i = 0; i< array.length; ++i)
    {
        array[i] = array[i].toLowerCase();
        array[i] = array[i].charAt(0).toUpperCase() + array[i].substr(1);
    }
    return array;
}

function validateColor(validColors, colors, invalidData, param)
{ 
    let savedColors = [];
    let foundColors = [];

    if(!validColors)
    {
        alert("Something went wrong when trying to validate the colors you selected. Some or all colors selected may not be added as filters");
    }
    else
    {
        if(colors && colors.length > 0)
        {
            console.log(validColors);
            colors = formatCapitilization(colors);

            //Loops through every valid color for the animal type
            //Anytime a color provided by the user is found to match 
            //a valid color, is added to the savedColor List.
            //This continues until there are no more valid colors to compare to.
            outerLoop:
            for(let i = 0; i < validColors.length; ++i)
            {

                for(let j = 0; j < colors.length; ++j)
                {
                    if(color[j] && validColors[i].includes(colors[j]))
                    {
                        if(savedColors && !savedColors.includes(validColors[i]))
                        {
                            let formattedParameter = encodeURIComponent(validColors[i]);
                            savedColors.push(formattedParameter);
                        }
                        if(foundColors && !foundColors.includes(colors[j]))
                            foundColors.push(colors[j]);
                    }
                }
            }
            //Adds all valid colors to the Filters
            if(savedColors)
            {
                param += '&color='
                for(let i = 0; i < (savedColors.length - 1); ++i)
                {
                    param += `${savedColors[i]},`;
                }
                param += `${savedColors[savedColors.length - 1]}`;
            }

            //Adds all invalid colors to the invalidData dictionary
            if(!foundColors || foundColors.length != colors.length)
            {
                colors.forEach(color=>{
                    if(!foundColors.includes(color))
                        invalidData["Colors"].push(color);
                })
            }
            else
                console.log(foundColors);
            if(savedColors)
                console.log(savedColors);
            console.log(invalidData);
        }
    }
    return {invalidData, param};
}
   
//Function to see all the possible animal types. Just used for planning validation
//since the documentation doesn't say the catagories of animals they have outright.
function getAnimalTypes()
{
    const getAnimalTypeURL = "https://api.petfinder.com/v2/types";
    fetch(getAnimalTypeURL, {
        headers: {
          Authorization: "Bearer " + token
        }
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
          //data.types.forEach(element=>{console.log(`${element.name}  `);})
          console.log(data);
      })
      .catch(function (error) {
        if (error.code) {
          console.log("ERROR STATUS: " + error.code + " ERROR MESSAGE: " + error.message);
        }
        //If a token is expired, gets new authorization token & re-runs the function.
        else if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
            getToken().then(getAnimalTypes()).catch((err)=>{
              console.log(err);
            });
          } else {
            console.log("ERROR MESSAGE: ", error.message);
          }
      });
}

getAnimalTypes();
