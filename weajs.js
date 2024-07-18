const inputBox= document.querySelector('.Input-box');
const searchbtn=document.getElementById('searchbtn');
const Weather_img=document.querySelector('.Weather-img');
const temperature=document.querySelector('.temperature');
const description=document.querySelector('.description');
const humidity=document.querySelector('.humidity1');
const wind_speed=document.querySelector('.windspeed');
const location_not_found=document.querySelector('.location-not-found');
const Weather_body=document.querySelector('.weather-body');
let input = document.querySelector('input');

async function checkWeather(city){
    const api_key="39e0300bb35ccbf1686bbc834cc1ea79";
    const url= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    const weather_data= await fetch(`${url}`).then(response=>response.json());
    console.log(weather_data);
    if(weather_data.cod === `400` || (weather_data.cod=== `404`)){
        location_not_found.style.display = "flex";
        Weather_body.style.display="none";
        console.log("error");
        return;
    }
    location_not_found.style.display="none";
    Weather_body.style.display="flex";
    temperature.innerHTML=`${Math.round(weather_data.main.temp-273.15)}°C`;
    description.innerHTML=`${weather_data.weather[0].description}`;
    humidity.innerHTML=`${weather_data.main.humidity}%`;
    wind_speed.innerHTML=`${weather_data.wind.speed}Kmph`;

    switch(weather_data.weather[0].main){
        case 'Clouds':
            Weather_img.src="Weathericons/clouds.png";
            break;
        case 'Clear':
            Weather_img.src="Weathericons/sun.png";
            break;
        case 'Rain':
            Weather_img.src="Weathericons/rainy.png";
            break;
        case 'Mist':
            Weather_img.src="Weathericons/wind.png";
            break;
        case 'Snow':
            Weather_img.src="Weathericons/snowflake.png";
            break;
        case 'Haze':
            Weather_img.src="Weathericons/fog.png";
            break;
    }
}
searchbtn.addEventListener('click',()=>{
    checkWeather(inputBox.value);
})

// Execute a function when the user presses a key on the keyboard
inputBox.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    checkWeather(inputBox.value);
  }
});