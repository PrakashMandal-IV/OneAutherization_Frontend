const API = "https://localhost:7059/"

function GetUserData(){

    fetch(API+'Login/GetUserData', {
        method: 'GET',
        headers: {
          'Accept': '*/*',
          'Authorization':"bearer "+sessionStorage.getItem('token')
        }
      })
        .then(response => response.json())
        .then(data => {
          
            document.getElementById('UserEmail').innerHTML=data[0]?.Email
            document.getElementById('UserName').innerHTML=data[0]?.FullName
            document.getElementById('UserIMG').src=data[0]?.Picture

        })
        .catch(error => console.error(error));
}


