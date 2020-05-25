// To make api calls, just hard code the token recieved by runninignthe followign command on 
//the command line:
//curl -d "grant_type=client_credentials&client_id=q8AtF9GiFiVL0k38sSW1zDpA3FazOBFL1zUXxO86J7jqgN3TxW&client_secret=VGwQffQcjmWOpL3FBRDQiWdHBvFXkg67MFp623nm" https://api.petfinder.com/v2/oauth2/token
//The token will work for 1 hour.
let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJxOEF0RjlHaUZpVkwwazM4c1NXMXpEcEEzRmF6T0JGTDF6VVh4Tzg2SjdqcWdOM1R4VyIsImp0aSI6IjExNjUwZjI1ZDAwMGU0OTVmZGY1ZmRhOWFiZDJhYWI4MzkzYjEyODMyOGUwNWMyOTM5Yzc2NmQ5ODgyZjFkOTE2Nzc1MzM3ZmI5MzA0YzRiIiwiaWF0IjoxNTkwMzg2OTE4LCJuYmYiOjE1OTAzODY5MTgsImV4cCI6MTU5MDM5MDUxOCwic3ViIjoiIiwic2NvcGVzIjpbXX0.KxWypKn05CY5um8TlHNd70ktvb6EcfTIY25Zk0mV8_vfAdwfpjJCdqeA2Nz7Towmyf9k1QyJTXZOjdiBnuQpP3Ko6Yz4172TiH5_xIqcDEBSPdWTbPRH27h7fTP5Ra_n4gebV5ZKYdzFnsX5pVp4g3W9YXWYKG007iuMQY0zmiZRC1hTZkE1W9tzMXhwh9Svt_zft58RuYVUG4qhZBR6X7b-_gPIF5EfYOYtLWSCbzJ3TmiCT4lkzHkJgX3cvOVj8GrEL6r4MKJfb4dtLE7TVeiTt1ZnY-1vtoMb0VRN99VMgDOlx8xPbVt4252bO3vXq94ylhMsLDGzJDQr9kjVxA";
//let token;
const clientID = 'q8AtF9GiFiVL0k38sSW1zDpA3FazOBFL1zUXxO86J7jqgN3TxW';
const clientSecret = 'VGwQffQcjmWOpL3FBRDQiWdHBvFXkg67MFp623nm';
const tokenUrl = 'https://api.petfinder.com/v2/oauth2/token';
export {token};

//This function will update the token if it is invalid
//It does not work yet  
export function getToken(){
    if(!token)
    {
        fetch(tokenUrl, {
            method: 'POST',
           body: `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`,
        }).then((response)=>{console.log(response)})
        .catch((error)=>{console.log(`ERROR MESSAGE: ${error}`);});
    }
    else{
        return token;
    }
}