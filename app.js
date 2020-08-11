
// how to send a get request with XML HTTP request
/* const Http = new XMLHttpRequest();
const url='http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=d328f2c99bab8eddaaf22e3a0ae087a8';
Http.open("GET", url);
Http.send();

Http.onreadystatechange = (e) => {
    console.log(Http.responseText)
}*/

function game(){
    let startBtn = document.querySelector('.start-btn');
    startBtn.addEventListener('click',function () {
        document.querySelector('.intro').classList.add('hide');
        document.querySelector('.game').classList.remove('hide');
    });
}


window.addEventListener('load', game);