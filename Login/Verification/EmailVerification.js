const API = "https://localhost:7059/"
function OnLoad() {
    let TOKEN = sessionStorage.getItem('token')
    if (TOKEN || TOKEN !== "") {
         SendOTP()
    }
}

async function countdown() {
    document.getElementById('resendtimer').style.display = "block"
    document.getElementById('resendbutton').style.display = "none"
    var minutes = 2;
    var seconds = 0;
    var timer = setInterval(function () {
        if (seconds == 0) {
            if (minutes == 0) {
                clearInterval(timer);
                console.log("Time's up!");
                // Or do something else when the timer reaches 0
            } else {
                minutes--;
                seconds = 59;
            }
        } else {
            seconds--;
        }
        var time = minutes.toString() + ':' + (seconds < 10 ? '0' : '') + seconds.toString();

        document.getElementById('Timer').innerHTML = time
        if (time === "0:00") {
            document.getElementById('resendbutton').style.display = "block"
            document.getElementById('resendtimer').style.display = "none"
        }
        // Or display the time in a specific HTML element
    }, 1000);
}
function SendOTP() {

    fetch(API + 'Verification/SendEmailVerificationOtp', {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Authorization': "bearer " + sessionStorage.getItem('token')
        }
    })
        .then(response => {
            countdown()
        })
        .catch(error => console.error(error));
}


function VerifyOTP() {
    var otp = document.getElementById('otp').value
    fetch(API + 'Verification/VerifyEmailOtp?OTP=' + otp, {
        method: 'GET',
        headers: {
            'Accept': '*/*',
            'Authorization': "bearer " + sessionStorage.getItem('token')
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.Status) {
                sessionStorage.setItem("token", data.Token)
                const url = window.location.href;
                const urlObj = new URL(url);
                const searchParams = urlObj.searchParams;
                const paramValue = searchParams.get('destination');

                if (paramValue === "Profile") {
                    window.location.href = "/Login/UserView.html"
                }


            } else {

            }

        })
        .catch(error => console.error(error));
}