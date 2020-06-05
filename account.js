loadFilters();

function test()
{
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

//Clears filters saved in local storage
function clearFilters(){
    localStorage.removeItem('parameters');
    localStorage.removeItem('savedFilters');
}

//NEED FUNCTION TO LOAD SAVED FILTERS FROM PARAMETERS
function loadFilters(){
    let param =localStorage.getItem('savedFilters');
    if(param){
        param = param.split('&');
        param.shift();
        param.forEach(parameter=>{
            let filters = parameter.split('=');
            let filterType = filters[0];
            filters = filters[1].split(',');
            switch(filterType)
            {
                case "location":
                    document.getElementById("zipcode").value = filters[0];
                    break;
                case "distance":
                    document.getElementById("distance").value = filters[0];
                    break;
                case "type":
                    document.getElementById("type").value = filters[0];
                    break;
                case "gender":
                    document.getElementById("gender").value = filters[0];
                    break;
                case "size":
                    document.getElementById("size").value = filters[0];
                    break;
                case "age":
                    document.getElementById("age").value = filters[0];
                    break;
                case "breed":
                    filters.forEach(filter=>{
                        filter = decodeURIComponent(filter);
                        var newOption = new Option(filter, filter, true, true);
                        $("#breed").append(newOption).trigger('change');
                    })
                    break;
                case "color":
                    filters.forEach(filter=>{
                        filter = decodeURIComponent(filter);
                        var newOption = new Option(filter, filter, true, true);
                        $("#color").append(newOption).trigger('change');
                    })
                    break;
                case "coat":
                    filters.forEach(filter=>{
                        filter = decodeURIComponent(filter);
                        var newOption = new Option(filter, filter, true, true);
                        $("#coat").append(newOption).trigger('change');
                    })
                    break;
                case "good_with_cats":
                    document.getElementById("good_with_cats").checked = true;
                    break;
                case "good_with_dogs":
                    document.getElementById("good_with_dogs").checked = true;
                    break;
                case "good_with_children":
                    document.getElementById("good_with_children").checked = true;
                    break;

            }
        })
    }
}

//Message to alert the user that the filters have been set
//Right now it just shows the message in an alert box.
//To change this, just edit line 101.
function submissionMessage(invalidData, zipcode)
{
    let message;

    if(!invalidData && zipcode && zipcode.length != 5)
    {
        message = "The filters have been updated, but the following data is invalid! It will not be added as a filter.";
        message += `Zipcode: ${zipcode} `;
    }
    else if(invalidData)
    {
        if(invalidData["Breeds"].length > 0 || invalidData["Colors"].length > 0 || invalidData["Coats"].length > 0 || (zipcode && zipcode.length != 5))
        {
            message = "The filters have been updated, but the following data is invalid! They will not be added as filters. ";
            if(zipcode && zipcode.length != 5)
            {
                message += `Zipcode: ${zipcode} `;
            }

            if(invalidData["Breeds"].length > 0)
            {
                message += 'Breeds: '
                for(let i = 0; i < invalidData["Breeds"].length -1; ++i)
                {
                    message += `${invalidData["Breeds"][i]},`;
                }
                message += `${invalidData["Breeds"][invalidData["Breeds"].length - 1]} `;
                
            }

            if(invalidData["Colors"].length > 0)
            {
                message += 'Colors: '
                for(let i = 0; i < invalidData["Colors"].length -1; ++i)
                {
                    message += `${invalidData["Colors"][i]},`;
                }
                message += `${invalidData["Colors"][invalidData["Colors"].length - 1]} `;
                
            }

            if(invalidData["Coats"].length > 0)
            {
                message += 'Coats: '
                for(let i = 0; i < invalidData["Coats"].length -1; ++i)
                {
                    message += `${invalidData["Coats"][i]},`;
                }
                message += `${invalidData["Coats"][invalidData["Coats"].length - 1]} `;
            }
        }
        else
            message = "The filters have been updated!";
    }
    else
        message = "The filters have been updated!";

    //EDIT THIS LINE IF YOU WANT TO CHANGE HOW THE MESSAGE IS DISPLAYED
    alert(message);
}

function updateFilters() {
    let param = "";
    let savedFilters = "";

    /*zipcode & distance should probably pair together*/
    //Veryify zipcode is 5 characters
    var zipcode = document.getElementById("zipcode").value;
    var distance = document.getElementById("distance").value;
    if(zipcode)
    {
        if(zipcode.length == 5)
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

    savedFilters = param;

    //Look up possible animals & add them 
    var type = document.getElementById("type").value;

    // array of serach items is returned for breed, color, coat
    //Validate through API
    //console.log($('#breed').select2('data'));
    var breeds = $('#breed').val();
    var colors = $('#color').val();
    var coats = $('#coat').val();
    console.log(breeds);
    console.log(breeds[0]);

    const getAnimalTypeURL = "https://api.petfinder.com/v2/types";
    let token = localStorage.getItem('token');
    /*
    if(!token)
    {
        getToken()
        .then(token = localStorage.getItem('token');).catch((err)=>{
            console.log(err);
            });
        token = localStorage.getItem('token');
    }*/
    try{
        fetch(getAnimalTypeURL, {
            headers: {
            Authorization: "Bearer " + token
            }
        }).then((response) => {
            return response.json();
        }).then((data) => {
                // A dictionary to map the type of data to any invalid data items provided by the user
            //This will be used to display an error message of all invalid data provided.
            let invalidData = {
                Breeds: [],
                Colors: [],
                Coats: [],
            };
            const validData = data.types;
            var allowedValues;
            console.log(type);
            switch(type){
                case "Dog":

                    param += "&type=Dog";
                    savedFilters += "&type=Dog";
                    allowedValues = validData[0];

                    if(!allowedValues)
                    {
                        alert("We are not able to validate any colors, breeds, or coats selected at this time. They will not be added as filters.")
                    }
                    else
                    {
                        let returnVal = validateColor(allowedValues.colors, colors, invalidData, param, savedFilters);
                        invalidData = returnVal.invalidData;
                        param = returnVal.param;
                        savedFilters = returnVal.savedFilters;

                        returnVal = validateCoat(allowedValues.coats, coats, invalidData, param, savedFilters);
                        invalidData = returnVal.invalidData;
                        param = returnVal.param;
                        savedFilters = returnVal.savedFilters;

                        if(breeds && breeds.length > 0)
                        {
                            fetch(`https://api.petfinder.com${allowedValues._links.breeds.href}`, {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
                              })
                                .then((response) => {
                                  return response.json();
                                })
                                .then((data) => {
                                    let returnVal = validateBreed(data.breeds, breeds, invalidData, param, savedFilters);
                                    invalidData = returnVal.invalidData;
                                    param = returnVal.param;
                                    savedFilters = returnVal.savedFilters;
                                    console.log(param);
                                    localStorage.setItem("parameters", param);
                                    localStorage.setItem("savedFilters", savedFilters);
                                    submissionMessage(invalidData, zipcode);
                                    return true;
                                })
                                .catch(error=>{console.log(error);});
                        }
                        else
                        {
                            console.log(param);
                            localStorage.setItem("parameters", param);
                            localStorage.setItem("savedFilters", savedFilters);
                            submissionMessage(invalidData, zipcode);
                            return true;

                        }

                    }
                    break;
                case "Cat":
                    param += "&type=Cat";
                    savedFilters += "&type=Cat";
                    allowedValues = validData[1];

                    
                    if(!allowedValues)
                    {
                        alert("We are not able to validate any colors, breeds, or coats selected at this time. They will not be added as filters.")
                    }
                    else
                    {
                        let returnVal = validateColor(allowedValues.colors, colors, invalidData, param, savedFilters);
                        invalidData = returnVal.invalidData;
                        param = returnVal.param;
                        savedFilters = returnVal.savedFilters;

                        returnVal = validateCoat(allowedValues.coats, coats, invalidData, param, savedFilters);
                        invalidData = returnVal.invalidData;
                        param = returnVal.param;
                        savedFilters = returnVal.savedFilters;

                        if(breeds && breeds.length > 0)
                        {
                            fetch(`https://api.petfinder.com${allowedValues._links.breeds.href}`, {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
                              })
                                .then((response) => {
                                  return response.json();
                                })
                                .then((data) => {
                                    let returnVal = validateBreed(data.breeds, breeds, invalidData, param, savedFilters);
                                    invalidData = returnVal.invalidData;
                                    param = returnVal.param;
                                    savedFilters = returnVal.savedFilters;
                                    console.log(param);
                                    localStorage.setItem("parameters", param);
                                    localStorage.setItem("savedFilters", savedFilters);
                                    submissionMessage(invalidData, zipcode);
                                    return true;
                                })
                                .catch(error=>{console.log(error);});
                        }
                        else
                        {
                            console.log(param);
                            localStorage.setItem("parameters", param);
                            localStorage.setItem("savedFilters", savedFilters);
                            submissionMessage(invalidData, zipcode);
                            return true;

                        }

                    }
                    break;
                case "Rabbit":
                    param += '&type=Rabbit';
                    savedFilters += "&type=Rabbit";
                    allowedValues = validData[2];


                    if(!allowedValues)
                    {
                        alert("We are not able to validate any colors, breeds, or coats selected at this time. They will not be added as filters.")
                    }
                    else
                    {
                        let returnVal = validateColor(allowedValues.colors, colors, invalidData, param, savedFilters);
                        invalidData = returnVal.invalidData;
                        param = returnVal.param;
                        savedFilters = returnVal.savedFilters;

                        returnVal = validateCoat(allowedValues.coats, coats, invalidData, param, savedFilters);
                        invalidData = returnVal.invalidData;
                        param = returnVal.param;
                        savedFilters = returnVal.savedFilters;

                        if(breeds && breeds.length > 0)
                        {
                            fetch(`https://api.petfinder.com${allowedValues._links.breeds.href}`, {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
                              })
                                .then((response) => {
                                  return response.json();
                                })
                                .then((data) => {
                                    let returnVal = validateBreed(data.breeds, breeds, invalidData, param, savedFilters);
                                    invalidData = returnVal.invalidData;
                                    param = returnVal.param;
                                    savedFilters = returnVal.savedFilters;
                                    console.log(param);
                                    localStorage.setItem("parameters", param);
                                    localStorage.setItem("savedFilters", savedFilters);
                                    submissionMessage(invalidData, zipcode);
                                    return true;
                                })
                                .catch(error=>{console.log(error);});
                        }
                        else
                        {
                            console.log(param);
                            localStorage.setItem("parameters", param);
                            localStorage.setItem("savedFilters", savedFilters);
                            submissionMessage(invalidData, zipcode);
                            return true;

                        }

                    }
                    break;
                case "Small & Furry":
                    param += `&type=${encodeURIComponent('Small & Furry')}`;
                    savedFilters += `&type=${encodeURIComponent('Small & Furry')}`;
                    allowedValues = validData[3];

  
                    if(!allowedValues)
                    {
                        alert("We are not able to validate any colors, breeds, or coats selected at this time. They will not be added as filters.")
                    }
                    else
                    {
                        let returnVal = validateColor(allowedValues.colors, colors, invalidData, param, savedFilters);
                        invalidData = returnVal.invalidData;
                        param = returnVal.param;
                        savedFilters = returnVal.savedFilters;

                        returnVal = validateCoat(allowedValues.coats, coats, invalidData, param, savedFilters);
                        invalidData = returnVal.invalidData;
                        param = returnVal.param;
                        savedFilters = returnVal.savedFilters;

                        if(breeds && breeds.length > 0)
                        {
                            fetch(`https://api.petfinder.com${allowedValues._links.breeds.href}`, {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
                              })
                                .then((response) => {
                                  return response.json();
                                })
                                .then((data) => {
                                    let returnVal = validateBreed(data.breeds, breeds, invalidData, param, savedFilters);
                                    invalidData = returnVal.invalidData;
                                    param = returnVal.param;
                                    savedFilters = returnVal.savedFilters;
                                    console.log(param);
                                    localStorage.setItem("parameters", param);
                                    localStorage.setItem("savedFilters", savedFilters);
                                    submissionMessage(invalidData, zipcode);
                                    return true;
                                })
                                .catch(error=>{console.log(error);});
                        }
                        else
                        {
                            console.log(param);
                            localStorage.setItem("parameters", param);
                            localStorage.setItem("savedFilters", savedFilters);
                            submissionMessage(invalidData, zipcode);
                            return true;

                        }

                    }

                    break;
                case "Horse":
                    param += "&type=Horse";
                    savedFilters += "&type=Horse";
                    allowedValues = validData[4];

                   
                    if(!allowedValues)
                    {
                        alert("We are not able to validate any colors, breeds, or coats selected at this time. They will not be added as filters.")
                    }
                    else
                    {
                        let returnVal = validateColor(allowedValues.colors, colors, invalidData, param, savedFilters);
                        invalidData = returnVal.invalidData;
                        param = returnVal.param;
                        savedFilters = returnVal.savedFilters;

                        returnVal = validateCoat(allowedValues.coats, coats, invalidData, param, savedFilters);
                        invalidData = returnVal.invalidData;
                        param = returnVal.param;
                        savedFilters = returnVal.savedFilters;

                        if(breeds && breeds.length > 0)
                        {
                            fetch(`https://api.petfinder.com${allowedValues._links.breeds.href}`, {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
                              })
                                .then((response) => {
                                  return response.json();
                                })
                                .then((data) => {
                                    let returnVal = validateBreed(data.breeds, breeds, invalidData, param, savedFilters);
                                    invalidData = returnVal.invalidData;
                                    param = returnVal.param;
                                    savedFilters = returnVal.savedFilters;
                                    console.log(param);
                                    localStorage.setItem("parameters", param);
                                    localStorage.setItem("savedFilters", savedFilters);
                                    submissionMessage(invalidData, zipcode);
                                    return true;
                                })
                                .catch(error=>{console.log(error);});
                        }
                        else
                        {
                            console.log(param);
                            localStorage.setItem("parameters", param);
                            localStorage.setItem("savedFilters", savedFilters);
                            submissionMessage(invalidData, zipcode);
                            return true;

                        }

                    }
                    break;
                case "Bird":
                    param += '&type=Bird';
                    savedFilters += "&type=Bird";
                    allowedValues = validData[5];

           
                    if(!allowedValues)
                    {
                        alert("We are not able to validate any colors, breeds, or coats selected at this time. They will not be added as filters.")
                    }
                    else
                    {
                        let returnVal = validateColor(allowedValues.colors, colors, invalidData, param, savedFilters);
                        invalidData = returnVal.invalidData;
                        param = returnVal.param;
                        savedFilters = returnVal.savedFilters;

                        returnVal = validateCoat(allowedValues.coats, coats, invalidData, param, savedFilters);
                        invalidData = returnVal.invalidData;
                        param = returnVal.param;
                        savedFilters = returnVal.savedFilters;

                        if(breeds && breeds.length > 0)
                        {
                            fetch(`https://api.petfinder.com${allowedValues._links.breeds.href}`, {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
                              })
                                .then((response) => {
                                  return response.json();
                                })
                                .then((data) => {
                                    let returnVal = validateBreed(data.breeds, breeds, invalidData, param, savedFilters);
                                    invalidData = returnVal.invalidData;
                                    param = returnVal.param;
                                    savedFilters = returnVal.savedFilters;
                                    console.log(param);
                                    localStorage.setItem("parameters", param);
                                    localStorage.setItem("savedFilters", savedFilters);
                                    submissionMessage(invalidData, zipcode);
                                    return true;
                                })
                                .catch(error=>{console.log(error);});
                        }
                        else
                        {
                            console.log(param);
                            localStorage.setItem("parameters", param);
                            localStorage.setItem("savedFilters", savedFilters);
                            submissionMessage(invalidData, zipcode);
                            return true;

                        }

                    }
                    break;
                case "Scales, Fins & Other":
                    param += `&type=${encodeURIComponent('Scales, Fins & Other')}`;
                    savedFilters += `&type=${encodeURIComponent('Scales, Fins & Other')}`;
                    allowedValues = validData[6];

                 
                    if(!allowedValues)
                    {
                        alert("We are not able to validate any colors, breeds, or coats selected at this time. They will not be added as filters.")
                    }
                    else
                    {
                        let returnVal = validateColor(allowedValues.colors, colors, invalidData, param, savedFilters);
                        invalidData = returnVal.invalidData;
                        param = returnVal.param;
                        savedFilters = returnVal.savedFilters;

                        returnVal = validateCoat(allowedValues.coats, coats, invalidData, param, savedFilters);
                        invalidData = returnVal.invalidData;
                        param = returnVal.param;
                        savedFilters = returnVal.savedFilters;

                        if(breeds && breeds.length > 0)
                        {
                            fetch(`https://api.petfinder.com${allowedValues._links.breeds.href}`, {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
                              })
                                .then((response) => {
                                  return response.json();
                                })
                                .then((data) => {
                                    let returnVal = validateBreed(data.breeds, breeds, invalidData, param, savedFilters);
                                    invalidData = returnVal.invalidData;
                                    param = returnVal.param;
                                    savedFilters = returnVal.savedFilters;
                                    console.log(param);
                                    localStorage.setItem("parameters", param);
                                    localStorage.setItem("savedFilters", savedFilters);
                                    submissionMessage(invalidData, zipcode);
                                    return true;
                                })
                                .catch(error=>{console.log(error);});
                        }
                        else
                        {
                            console.log(param);
                            localStorage.setItem("parameters", param);
                            localStorage.setItem("savedFilters", savedFilters);
                            submissionMessage(invalidData, zipcode);
                            return true;

                        }

                    }
                    break;
                case "Barnyard":
                    param += '&type=Barnyard';
                    savedFilters += '&type=Barnyard';
                    allowedValues = validData[7];
  
                    if(!allowedValues)
                    {
                        alert("We are not able to validate any colors, breeds, or coats selected at this time. They will not be added as filters.")
                    }
                    else
                    {
                        let returnVal = validateColor(allowedValues.colors, colors, invalidData, param, savedFilters);
                        invalidData = returnVal.invalidData;
                        param = returnVal.param;
                        savedFilters = returnVal.savedFilters;

                        returnVal = validateCoat(allowedValues.coats, coats, invalidData, param, savedFilters);
                        invalidData = returnVal.invalidData;
                        param = returnVal.param;
                        savedFilters = returnVal.savedFilters;

                        if(breeds && breeds.length > 0)
                        {
                            fetch(`https://api.petfinder.com${allowedValues._links.breeds.href}`, {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
                              })
                                .then((response) => {
                                  return response.json();
                                })
                                .then((data) => {
                                    let returnVal = validateBreed(data.breeds, breeds, invalidData, param, savedFilters);
                                    invalidData = returnVal.invalidData;
                                    param = returnVal.param;
                                    savedFilters = returnVal.savedFilters;
                                    console.log(param);
                                    localStorage.setItem("parameters", param);
                                    localStorage.setItem("savedFilters", savedFilters);
                                    submissionMessage(invalidData, zipcode);
                                    return true;
                                })
                                .catch(error=>{console.log(error);});
                        }
                        else
                        {
                            console.log(param);
                            localStorage.setItem("parameters", param);
                            localStorage.setItem("savedFilters", savedFilters);
                            submissionMessage(invalidData, zipcode);
                            return true;

                        }

                    }
                    break;
                default:
                    let validColors = [];
                    let validBreeds = new Array();
                    let validCoats = ['Short', 'Medium', 'Long', 'Wire', 'Hairless', 'Curly'];
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

                        let returnVal = validateColor(validColors, colors, invalidData, param, savedFilters);
                        invalidData = returnVal.invalidData;
                        param = returnVal.param;
                        savedFilters = returnVal.savedFilters;

                        returnVal = validateCoat(validCoats, coats, invalidData, param, savedFilters);
                        invalidData = returnVal.invalidData;
                        param = returnVal.param;
                        savedFilters = returnVal.savedFilters;
    
                        if(breeds && breeds.length > 0)
                        {
                            fetch(`https://api.petfinder.com${validData[0]._links.breeds.href}`, {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
                              })
                                .then((response) => {
                                  return response.json();
                                })
                                .then((data) => {
                                    validBreeds = validBreeds.concat(data.breeds);



                                    fetch(`https://api.petfinder.com${validData[1]._links.breeds.href}`, {
                                        headers: {
                                          Authorization: `Bearer ${token}`,
                                        },
                                      })
                                        .then((response) => {
                                          return response.json();
                                        })
                                        .then((data) => {
                                    validBreeds = validBreeds.concat(data.breeds);
        
        
        
                                            fetch(`https://api.petfinder.com${validData[2]._links.breeds.href}`, {
                                                headers: {
                                                  Authorization: `Bearer ${token}`,
                                                },
                                              })
                                                .then((response) => {
                                                  return response.json();
                                                })
                                                .then((data) => {
                                                    validBreeds = validBreeds.concat(data.breeds);
                
                
                
                
                                                    fetch(`https://api.petfinder.com${validData[3]._links.breeds.href}`, {
                                                        headers: {
                                                          Authorization: `Bearer ${token}`,
                                                        },
                                                      })
                                                        .then((response) => {
                                                          return response.json();
                                                        })
                                                        .then((data) => {
                                                            validBreeds = validBreeds.concat(data.breeds);
                        
                        
                        
                                                            fetch(`https://api.petfinder.com${validData[4]._links.breeds.href}`, {
                                                                headers: {
                                                                  Authorization: `Bearer ${token}`,
                                                                },
                                                              })
                                                                .then((response) => {
                                                                  return response.json();
                                                                })
                                                                .then((data) => {
                                                                    validBreeds = validBreeds.concat(data.breeds);
                                
                                
                                
                                                                    fetch(`https://api.petfinder.com${validData[5]._links.breeds.href}`, {
                                                                        headers: {
                                                                          Authorization: `Bearer ${token}`,
                                                                        },
                                                                      })
                                                                        .then((response) => {
                                                                          return response.json();
                                                                        })
                                                                        .then((data) => {
                                                                            validBreeds = validBreeds.concat(data.breeds);
                                        
                                        
                                        
                                        
                                                                            fetch(`https://api.petfinder.com${validData[6]._links.breeds.href}`, {
                                                                                headers: {
                                                                                  Authorization: `Bearer ${token}`,
                                                                                },
                                                                              })
                                                                                .then((response) => {
                                                                                  return response.json();
                                                                                })
                                                                                .then((data) => {
                                                                                    validBreeds = validBreeds.concat(data.breeds);
                                                
                                                
                                                
                                                                                    fetch(`https://api.petfinder.com${validData[7]._links.breeds.href}`, {
                                                                                        headers: {
                                                                                          Authorization: `Bearer ${token}`,
                                                                                        },
                                                                                      })
                                                                                        .then((response) => {
                                                                                          return response.json();
                                                                                        })
                                                                                        .then((data) => {
                                                                                            validBreeds = validBreeds.concat(data.breeds);
                                                                                            let returnVal = validateBreed(validBreeds, breeds, invalidData, param, savedFilters);
                                                                                            invalidData = returnVal.invalidData;
                                                                                            param = returnVal.param;
                                                                                            savedFilters = returnVal.savedFilters;
                                                                                            console.log(param);
                                                                                            localStorage.setItem("parameters", param);
                                                                                            localStorage.setItem("savedFilters", savedFilters);
                                                                                            submissionMessage(invalidData, zipcode);
                                                                                                return true;
                                                                                        })
                                                                                        .catch(error=>{console.log(error);});
                                                
                                                
                                                
                                                
                                                                                    
                                                                                })
                                                                                .catch(error=>{console.log(error);});
                                        
                                        
                                        
                                                                            
                                                                        })
                                                                        .catch(error=>{console.log(error);});
                                
                                
                                
                                
                                                                    
                                                                })
                                                                .catch(error=>{console.log(error);});
                        
                        
                        
                        
                                                            
                                                        })
                                                        .catch(error=>{console.log(error);});
                
                
                
                                                    
                                                })
                                                .catch(error=>{console.log(error);});
        
        
        
        
                                            
                                        })
                                        .catch(error=>{console.log(error);});





                                })
                                .catch(error=>{console.log(error);});

                        }
                        else
                        {
                            console.log(param);
                            localStorage.setItem("parameters", param);
                            localStorage.setItem("savedFilters", savedFilters);
                            submissionMessage(invalidData, zipcode);
                            loadFilters();
                            clearFilters();
                            return true;

                        }
                            /*function getAllBreeds(validBreeds, validData, index)
                            {
                                if(index > 7)
                                
                                    return validBreeds;
                                await fetch(`https://api.petfinder.com${validData[index]._links.breeds.href}`, {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                                })
                                .then((response) => {
                                    return response.json();
                                })
                                .then((data) => {
                                    validBreeds.concat(data.breeds);
                                    return getAllBreeds(validBreeds, validData, index + 1);
                                })
                                .catch(error=>{console.log(error);
                                    return null;});
                                }
                            }
                            validBreeds = getAllBreeds(validBreeds, validData, 0);
                        
*/
/*
                        async function getAllBreeds(validBreeds, validData, invalidData, param){
                           // return new Promise((resolve, reject)=>{

                                for(let i = 0; i < validData.length; ++i)
                                {
                                    let data = await fetch(`https://api.petfinder.com${validData[i]._links.breeds.href}`, {
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                    }
                                    });

                                    data = await data.json();
                                    if(data && data.breeds)
                                    {
                                        validBreeds.concat(data.breeds);
                                    }
                                    else
                                    {
                                        console.log(`ERROR FROM ALL BREEDS: ${data}`);
                                    }
                                }

                                let returnVal = validateBreed(validBreeds, breeds, invalidData, param);
                                invalidData = returnVal.invalidData;
                                param = returnVal.param;
                                console.log(param);
                                localStorage.setItem("parameters", param);
                                return true;

                            //});
                        }
                        getAllBreeds(validBreeds, validData, invalidData, param);
                    }
                    else
                    {
                        console.log(param);
                        localStorage.setItem("parameters", param);
                        return true;

                    }
                }
                */

                    break;

            }
        }
        /*    console.log(param);
            localStorage.setItem("parameters", param);*/
        })
        .catch((error) => {
            if (error.code) {
            console.log("ERROR STATUS: " + error.code + " ERROR MESSAGE: " + error.message);
            }
            //If a token is expired, gets new authorization token & re-runs the function.
            else if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
                getToken()
                .then(response=>{updateFilters();})
                .catch((err)=>{
                console.log(err);
                });
            } else {
                console.log("ERROR MESSAGE: ", error.message);
            }
        });
        return true;
    }catch(error)
    {
        getToken()
        .then(response=>{updateFilters();})
        .catch((err)=>{
        console.log(err);
        return false;
        });
    }
}

function formatCapitilization(array){
    for(let i = 0; i< array.length; ++i)
    {
        array[i] = array[i].trim();
        array[i] = array[i].toLowerCase();
        array[i] = array[i].charAt(0).toUpperCase() + array[i].substr(1);
        for(let j = 0; j < array[i].length -1; ++j)
        {
            if(array[i].charAt(j) == ' ')
                array[i] = array[i].substr(0, j + 1) + array[i].charAt(j+1).toUpperCase() + array[i].substr(j + 2);
        }
    }
    return array;
}

function validateBreed(validBreeds, breeds, invalidData, param, savedFilters)
{ 
    let savedBreeds = [];
    let foundBreeds = [];

    if(!validBreeds)
    {
        alert("Something went wrong when trying to validate the breeds you selected. Some or all breeds selected may not be added as filters");
    }
    else
    {
        if(breeds && breeds.length > 0)
        {
            console.log(validBreeds);
            breeds = formatCapitilization(breeds);

            //Loops through every valid color for the animal type
            //Anytime a color provided by the user is found to match 
            //a valid color, is added to the savedColor List.
            //This continues until there are no more valid colors to compare to.
            outerLoop:
            for(let i = 0; i < validBreeds.length; ++i)
            {
                if(validBreeds[i].name.includes(','))
                    continue;

                for(let j = 0; j < breeds.length; ++j)
                {
                    if(breeds[j] && validBreeds[i].name.includes(breeds[j]))
                    {
                        if(savedBreeds && !savedBreeds.includes(validBreeds[i].name))
                        {
                            let formattedParameter = encodeURIComponent(validBreeds[i].name);
                            savedBreeds.push(formattedParameter);
                           // savedColors.push(validColors[i]);
                        }
                        if(foundBreeds && !foundBreeds.includes(breeds[j]))
                            foundBreeds.push(breeds[j]);
                    }
                }
            }
            //Adds all valid colors to the Filters
            if(savedBreeds && savedBreeds.length > 0)
            {
                param += '&breed=';
                for(let i = 0; i < (savedBreeds.length - 1); ++i)
                {
                    param += `${savedBreeds[i]},`;
                }
                param += `${savedBreeds[savedBreeds.length - 1]}`;
            }

            if(foundBreeds && foundBreeds.length > 0)
            {
                savedFilters += '&breed=';
                for(let i = 0; i < (foundBreeds.length - 1); ++i)
                {
                    savedFilters += `${foundBreeds[i]},`;
                }
                savedFilters += `${foundBreeds[foundBreeds.length - 1]}`;
            }

            //Adds all invalid colors to the invalidData dictionary
            if(!foundBreeds || foundBreeds.length != breeds.length)
            {
                breeds.forEach(breed=>{
                    if(!foundBreeds.includes(breed))
                        invalidData["Breeds"].push(breed);
                })
            }
            else
                console.log(foundBreeds);
            if(savedBreeds)
                console.log(savedBreeds);
            console.log(invalidData);
        }
    }
    return {invalidData, param, savedFilters};
}

function validateColor(validColors, colors, invalidData, param, savedFilters)
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
                if(validColors[i].includes(','))
                    continue;

                for(let j = 0; j < colors.length; ++j)
                {
                    if(color[j] && validColors[i].includes(colors[j]))
                    {
                        if(savedColors && !savedColors.includes(validColors[i]))
                        {
                            let formattedParameter = encodeURIComponent(validColors[i]);
                            savedColors.push(formattedParameter);
                           // savedColors.push(validColors[i]);
                        }
                        if(foundColors && !foundColors.includes(colors[j]))
                            foundColors.push(colors[j]);
                    }
                }
            }
            //Adds all valid colors to the Filters
            if(savedColors && savedColors.length > 0)
            {
                param += '&color='
                for(let i = 0; i < (savedColors.length - 1); ++i)
                {
                    param += `${savedColors[i]},`;
                }
                param += `${savedColors[savedColors.length - 1]}`;
            }

            if(foundColors && foundColors.length > 0)
            {
                savedFilters += '&color='
                for(let i = 0; i < (foundColors.length - 1); ++i)
                {
                    savedFilters += `${foundColors[i]},`;
                }
                savedFilters += `${foundColors[foundColors.length - 1]}`;
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
    return {invalidData, param, savedFilters};
}

function validateCoat(validCoats, coats, invalidData, param, savedFilters)
{ 
    let savedCoats = [];

    if(!validCoats)
    {
        coats.forEach(coat=>{
            invalidData["Coats"].push(coat);
        })
    }
    else
    {
        if(coats && coats.length > 0)
        {
            console.log(validCoats);
            coats = formatCapitilization(coats);

            for(let i = 0; i < validCoats.length; ++i)
            {
                for(let j = 0; j < coats.length; ++j)
                {
                    if(coats[j] && validCoats[i].includes(coats[j]))
                    {
                        if(savedCoats)
                        {
                           savedCoats.push(validCoats[i]);
                           coats[j] = null;
                           break;
                        }
                    }
                }
            }

            //Adds all valid colors to the Filters
            if(savedCoats && savedCoats.length > 0)
            {
                param += '&coat='
                savedFilters += '&coat='
                for(let i = 0; i < (savedCoats.length - 1); ++i)
                {
                    param += `${savedCoats[i]},`;
                    savedFilters += `${savedCoats[i]},`;
                }
                param += `${savedCoats[savedCoats.length - 1]}`;
                savedFilters += `${savedCoats[savedCoats.length - 1]}`;
                console.log(savedCoats);
            }

            //Adds all invalid colors to the invalidData dictionary
            if(!savedCoats || savedCoats.length != coats.length)
            {
                coats.forEach(coat=>{
                    if(coat)
                        invalidData["Coats"].push(coat);
                })
            }

            console.log(invalidData);
        }
    }
    return {invalidData, param, savedFilters};
}
   
//Function to see all the possible animal types. Just used for planning validation
//since the documentation doesn't say the catagories of animals they have outright.
function getAnimalTypes()
{
    const getAnimalTypeURL = "https://api.petfinder.com/v2/types";
    let token = localStorage.getItem('token');
    try{
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
      return true;
    }catch(error)
    {
      getToken()
      .then(getAnimalTypes())
      .catch((err) => {
        console.log(err);
      });
    }
}

//getAnimalTypes();
