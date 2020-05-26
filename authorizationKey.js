// To make api calls, just hard code the token recieved by runninignthe followign command on 
//the command line:
//curl -d "grant_type=client_credentials&client_id=q8AtF9GiFiVL0k38sSW1zDpA3FazOBFL1zUXxO86J7jqgN3TxW&client_secret=VGwQffQcjmWOpL3FBRDQiWdHBvFXkg67MFp623nm" https://api.petfinder.com/v2/oauth2/token
//The token will work for 1 hour.
var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJxOEF0RjlHaUZpVkwwazM4c1NXMXpEcEEzRmF6T0JGTDF6VVh4Tzg2SjdqcWdOM1R4VyIsImp0aSI6IjY2ZmFiMTg1YWI3NTA3NzQ3Mzc2ZmZhYjZhZjgxYmU1NzU4NDVkYjE2NzA4M2QzN2IxOTdmMjAyMDA0YTAzMjMzZDQ5MDY1ZTM2OTVmNDA2IiwiaWF0IjoxNTkwNTI4MDM0LCJuYmYiOjE1OTA1MjgwMzQsImV4cCI6MTU5MDUzMTYzNCwic3ViIjoiIiwic2NvcGVzIjpbXX0.ypD9ujs2gGF_ULl4KdC7jrD6GnxeW2PzWN6F3GjJmVZqQJHgFqLZ_icYGPbSZlKQg9UR_RQlICcmoB9k8WHBjy0vrXTntkRS31S9jgBa7SuJuXSViP6khBnHWhc3HvKObHQmCbb9oeycofc3vitRQzqxvOAJmpZXbrhVjRfxKcSq2H8ApZPzEIlI-Mt5l1HQdQK_udJBlMNMTrrWeSOS-eldn1kShW6zYneLNr9hAgqeYdwJ536xuoIvrfmZdamI46datkoFQUBopTqAG0qWstJJqmDOCev3JcqW_b9kS7_BBFzUc_uEiyjK93lfKStmAg9YkJYHD700eM9rFafptA";
//var token;
const clientID = 'q8AtF9GiFiVL0k38sSW1zDpA3FazOBFL1zUXxO86J7jqgN3TxW';
const clientSecret = 'VGwQffQcjmWOpL3FBRDQiWdHBvFXkg67MFp623nm';
const tokenUrl = 'https://api.petfinder.com/v2/oauth2/token';

//This function will update the token if it is invalid
//It does not work yet  
function getToken(){
    if(!token)
    {
        fetch(tokenUrl, {
            method: 'POST',
           //body: `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`,
           body: "grant_type=client_credentials&client_id=q8AtF9GiFiVL0k38sSW1zDpA3FazOBFL1zUXxO86J7jqgN3TxW&client_secret=VGwQffQcjmWOpL3FBRDQiWdHBvFXkg67MFp623nm",
        }).then((response)=>{console.log(response)})
        .catch((error)=>{console.log(`ERROR MESSAGE: ${error}`);});
    }
    else{
        return token;
    }
}