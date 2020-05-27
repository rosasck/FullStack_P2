//Here is a valid pet id to test with 47929706.
let id = 0;
let petIDUrl = `https://api.petfinder.com/v2/animals/${id}`;

//This function should be called before the pet page is rendered!
//It sets what pet should be displayed on the page.
function setPetID(idToLoad){
    id = idToLoad;
    petIDUrl = `https://api.petfinder.com/v2/animals/${id}`;
}

function loadPet(){
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

        // Renders pet information. This should be updated later to have more info.
        let pet = data.animal;
        let image = pet.photos[0] ? pet.photos[0].medium : "https://cdn.clipart.email/dd7ca471f7af2bb0f501a464970b2b1b_kawaii-cute-cat-face-drawing-cuteanimals_360-360.jpeg";
        let name = pet.name ? pet.name : "Unknown";
        //The description needs to be modified to replace 
        let desc = pet.description ? pet.description : "";
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
    if(error.code == 404)
    {
        const element = (
            <div>
                <h1>404 Error</h1>
                <p>The pet you are looking for could not be found. It may have gotten adopted.</p>
            </div>
        );

        ReactDOM.render(element, document.getElementById('root'));
    }
    else if(error.code){
         console.log(`ERROR STATUS: ${error.code} ERROR MESSAGE: ${error.message}`);
    }
    //Supposed to check if a token has expired, but is not the correct conditonal 
    else if(error.message.includes("Failed to fetch"))
    {
         //getToken();
    }
    else{
         console.log('ERROR MESSAGE: ', error.message);
     }
 });
}

loadPet();