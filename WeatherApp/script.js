let key = "88906602a8c7d1eb1528e7e4a994a7ad";


// fetch(`https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${key}`)
// .then((res) =>{
//     return res.json();
// })
// .then((data)=>{
//     console.log(data)
// })

async function search() {
    const phrase = document.querySelector('input[type="text"]').value;
    const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${phrase}&limit=5&appid=${key}&units=metric`
    );
    const data = await response.json();

    //now we need capture ul from from
    const ul = document.querySelector("form ul");
    ul.innerHTML = "";

    //iterating over all elements
    for (let i = 0; i < data.length; i++) {
        const { name, lat, lon, country } = data[i];

        ul.innerHTML += `<li 
         data-lat = "${lat}"
         data-lon = "${lon}" 
         data-name = "${name}">
         ${name} <span>${country}</span> </li>`;
    }
}
const debouncedSearch = _.debounce(() => {
    search();
}, 600);


//creating af funtion to fetch the original data which from latitude and longiture

async function fethWeather(lat , lon, name){
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`)
    const data= await res.json()
    console.log(data)
    // extracting all data from the response recived 
    const temp = data.main.temp
    const feelsLike = data.main.feels_like;
    const humidityData = data.main.humidity;
    const windSpeed = data.wind.speed;
    const icon = data.weather[0].icon
    // console.log(icon ,temp , feelsLike, humidityData, windSpeed)
    //now all the data is fetched 
    document.getElementById('temp').innerHTML = temp + '<span>&deg;C</span>';
    document.getElementById('ico').src =` https://openweathermap.org/img/wn/10d@2x.png`;
    document.getElementById('city-name').innerHTML = name;
    document.getElementById('f-like-val').innerHTML = feelsLike+ '<span>&deg;C</span>';

    document.getElementById('humidity-val').innerHTML = humidityData+ '<span>%</span>';
    
    document.getElementById('wind-val').innerHTML = windSpeed + "<span>km/h</span>";

    document.querySelector('form').style.display = 'none'
    document.getElementsByClassName('display2')[0].style.display = 'flex'

    
}
document
    .querySelector('input[type="text"]')
    .addEventListener("keyup", debouncedSearch);


 document.body.addEventListener('click', ev=>{
    ev.preventDefault
    const li = ev.target
    const {lat, lon , name} = li.dataset;
    localStorage.setItem('lat' , lat)
    localStorage.setItem('lon' , lon)
    localStorage.setItem('name' ,name)
    if(!lat){
        return ;
    }
    fethWeather(lat, lon, name)
 
})
document.getElementById('city-change').addEventListener('click' , ()=>{
        document.getElementById('display2').style.display = "none"
        document.getElementById('display1').style.display= 'flex'
})

document.body.onload = ()=>{
    if(localStorage.getItem('lat')){
        console.log("suceesfull");
        const lat  = localStorage.getItem('lat')
        const lon  = localStorage.getItem('lon')
        const name  = localStorage.getItem('name')
        fethWeather(lat, lon, name)
    }
}