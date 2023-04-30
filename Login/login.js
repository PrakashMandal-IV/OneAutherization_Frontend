const API = "https://localhost:7059/"




function onSignInwithGoogle(googleUser) {
  const responsePayload = decodeJwt(googleUser.credential);
  const payload = {
    id: responsePayload.sub,
    email: responsePayload.email,
    fName: responsePayload.given_name,
    lName: responsePayload.family_name,
    picture: responsePayload.picture
  };

  fetch(API + 'Login/GoogleAuth', {
    method: 'POST',
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then(response => response.json())
    .then(data => {
      if (data.Status) {
        sessionStorage.setItem("token", data.Token)
        window.location.href = "/Login/UserView.html"
      } else {

      }
    })
    .catch(error => console.error(error));

}

function decodeJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((char) => `%${`00${char.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );
  return JSON.parse(jsonPayload);
}
function statusChangeCallback(response) {
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    SuccessLogin();
  } else {
    // The person is not logged into your app or we are unable to tell.
    document.getElementById('status').innerHTML = 'Please log ' +
      'into this app.';
  }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
  FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
  });
}
 
window.fbAsyncInit = function () {
  FB.init({
    appId: '773561687712961',
    cookie: true,  // enable cookies to allow the server to access            
    xfbml: true,  // parse social plugins on this page
    version: 'v16.0' // Specify the Graph API version to use
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
  });

};

// Load the SDK asynchronously
(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function SuccessLogin() {
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', { fields: 'id,first_name,last_name,email,picture' }, function (data) {

    const payload = {
      id: data.id,
      email: data.email,
      fName: data.first_name,
      lName: data.last_name,
      picture: data.picture.data.url
    };

    fetch(API + 'Login/FBAuth', {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(data => {
        if (data.Status) {
          sessionStorage.setItem("token", data.Token)
          window.location.href = "/Login/UserView.html"
        } else {

        }
      })
      .catch(error => console.error(error));
  });
}


function SimpleLogin() {
  
  let email = document.getElementById('UserEmail').value
  let Password = document.getElementById('UserPassword').value

  var error = false
  if (email === "") {
    error = true
    document.getElementById('UserEmail').style.border = "1px solid red"
  } else {
    document.getElementById('UserEmail').style.border = ""
  }
  if (Password === "") {
    error = true
    document.getElementById('UserPassword').style.border = "1px solid red"
  } else {
    document.getElementById('UserPassword').style.border = ""
  }

  if (!validateEmail(email)) {
    error = true
    document.getElementById('UserEmail').style.border = "1px solid red"

  } else {
    document.getElementById('UserEmail').style.border = ""
  }
  if (error) {
    return
  }
  fetch(API + 'Login/sLogin?email=' + email + '&password=' + Password, {
    method: 'GET',
    headers: {
      'Accept': '*/*'
    }
  })
    .then(response => response.json())
    .then(data => {
      if (data.Status) {
        sessionStorage.setItem("token", data.Token)
        window.location.href = "/Login/UserView.html"
      } else {

      }
    })
    .catch(error => console.error(error));
}
function ToggleLoginSignup(type) {

  if (type === 'login') {
    document.getElementById('Register').style.display = "none"
    document.getElementById('Login').style.display = "block"
  } else {
    document.getElementById('Login').style.display = "none"
    document.getElementById('Register').style.display = "block"
  }
}
ToggleLoginSignup('login')
function SignUp() {
  const payload = {
    "name": document.getElementById('RegUserName').value,
    "email": document.getElementById('RegUserEmail').value,
    "password": document.getElementById('RegUserPassword').value
  }
  var error = false
  if (payload.name === "") {
    error = true
    document.getElementById('RegUserName').style.border = "1px solid red"
  } else {
    document.getElementById('RegUserName').style.border = ""
  }
  if (payload.password === "") {
    error = true
    document.getElementById('RegUserPassword').style.border = "1px solid red"
  }else {
    document.getElementById('RegUserPassword').style.border = ""
  }
  if (payload.email === "") {
    error = true
    document.getElementById('RegUserEmail').style.border = "1px solid red"
  }else {
    document.getElementById('RegUserEmail').style.border  = ""
  }

  if (!validateEmail(payload.email)) {
    error = true
    document.getElementById('RegUserEmail').style.border = "1px solid red"

  }else {
    document.getElementById('RegUserEmail').style.border  = ""
  }
  if (error) {
    return
  }
  fetch(API + 'Login/UserSignUp', {
    method: 'POST',
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then(response => response.json())
    .then(data => {
      if (data.Status) {
        if (data.Status) {
          sessionStorage.setItem("token", data.Token)
          window.location.href = "/Login/UserView.html"
        } else {
  
        }
      } else {

      }
    })
    .catch(error => console.error(error));
}



function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
