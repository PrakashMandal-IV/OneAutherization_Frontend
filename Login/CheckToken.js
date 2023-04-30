


function CheckToken(){
    
    var tokendetails = decodeJwt(sessionStorage.getItem('token'))
    const role =tokendetails['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

    if(role ==="UnAuthorized"){
        window.location.href = "/Login/Verification/EmailVerification.html?destination=Profile"
    }
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

  CheckToken()