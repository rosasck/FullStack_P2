

//this function signs out a user to the google sign in 
//this allows the connection to google to time out!
function signOut() {
    localStorage.removeItem('parameters');
    localStorage.removeItem('savedFilters');
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }