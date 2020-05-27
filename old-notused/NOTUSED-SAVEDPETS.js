
function myCard(petName, petLocation, petImage, petLink){
    var para = document.createElement("P");               // Create a <p> element
    para.innerText = "Pet Name: ";               // Insert text
    document.body.appendChild(para);  

    name1.innerText = petName;
    location1.innerText = petLocation;
    link1.innerText = petLink;
    document.getElementById("pic1").src= "https://photos.petfinder.com/photos/pets/42706540/1/?bust=1546042081&width=300";
    
}