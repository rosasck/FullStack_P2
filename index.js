

//this creates the pet array in local storage 
let petArray=[]
localStorage.setItem('savedPetsArray', JSON.stringify(petArray));


//this is the sign in fucntion for the google API 
//that lets me take the users ID to put in DB 
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    
}