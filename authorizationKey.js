//var token; 
//const clientID = '8xtii4UdnSYlgTIkNcyf9aIfhf2ww1asbyvffLB4M8BlXvxapg';
//const clientSecret = 'phVQBxX3AYShf0KXqUbLIytYE9gMVDXNRS8JPS14';
const clientID = 'q8AtF9GiFiVL0k38sSW1zDpA3FazOBFL1zUXxO86J7jqgN3TxW';
const clientSecret = 'VGwQffQcjmWOpL3FBRDQiWdHBvFXkg67MFp623nm';
const tokenUrl = 'https://api.petfinder.com/v2/oauth2/token';

// Gets a new authorization token. This function should only be used if token is 
//undefined or if a get request failed due to an expired token.
function getToken(){
    return new Promise((resolve, reject)=>{
        fetch(tokenUrl, {
            method: 'POST',
            headers: new Headers({'content-type': 'application/x-www-form-urlencoded'}),
           body: `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`,
        }).then((response)=>{return response.json()})
        .then(object=>{/*token = object.access_token*/ localStorage.setItem("token", object.access_token); resolve('token was updated');})
        .catch((error)=>{console.log(`ERROR MESSAGE: ${error}`); reject('failed while updating token');});
    });
}

/*
var token;
const clientID = 'q8AtF9GiFiVL0k38sSW1zDpA3FazOBFL1zUXxO86J7jqgN3TxW';
const clientSecret = 'VGwQffQcjmWOpL3FBRDQiWdHBvFXkg67MFp623nm';
const tokenUrl = 'https://api.petfinder.com/v2/oauth2/token';

// Gets a new authorization token. This function should only be used if token is 
//undefined or if a get request failed due to an expired token.
export function getToken(){
    return token;
}
export function fetchToken(){
    return new Promise((resolve, reject)=>{
        fetch(tokenUrl, {
            method: 'POST',
            headers: new Headers({'content-type': 'application/x-www-form-urlencoded'}),
           body: `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`,
        }).then((response)=>{return response.json()})
        .then(object=>{token = object.access_token; resolve('token was updated');})
        .catch((error)=>{console.log(`ERROR MESSAGE: ${error}`); reject('failed while updating token');});
    });
}*/