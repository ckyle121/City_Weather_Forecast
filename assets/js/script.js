// API key 
apiKey = "581ce92b85fceec3c210d9faa500eccb"

// variables to reference dom
dailyWeatherEl = document.querySelector("#daily-weather")
searchBtn = document.querySelector("#search-btn");
cityNameInput = document.querySelector("#cityName");
forecastContainerEl = document.querySelector("#forecast-weather");
citySearchName = document.querySelector("#city-search-term");

// function to handle city submit
var formSubmitHandler = function(event){
    // prevent page from refresh
    event.preventDefault();

    // get vallue from input element
    var cityName = cityNameInput.value.trim();

    if (cityName){
        getDailyWeather(cityName);
        getForecastWeather(cityName);

        // clear old serach content
        
    } else{
        alert("Please enter a City Name");
    }
}

// get daily weather temp, wind, humidity
var getDailyWeather = function(cityName){
    // format weather api url 
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=" + apiKey;

    // make a request to get data from url
    fetch(apiUrl)
        .then(function(response){
            // response was succesful
            if (response.ok){
                response.json().then(function(data){
                    console.log(data)

                    // add city name and date to header 
                    var currentDate = new Date(data.dt*1000).toLocaleDateString();
                    citySearchName.textContent = cityName + " " + currentDate;

                    // add weather icon next to name in header
                    weatherIcon = document.querySelector("#weather-icon")
                    weatherIcon.src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
                    

                    // add temp to dom
                    temp = document.querySelector("#temperature");
                    temp.innerHTML = "Temperature: " + k2f(data.main.temp) + "&#176;" + "F";

                    // add humidity to dom
                    humidity = document.querySelector("#humidity");
                    humidity.innerHTML = "Humidity: " + data.main.humidity + "%";

                    // add wind to dom 
                    wind = document.querySelector("#wind");
                    wind.innerHTML = "Wind Speed: " + data.wind.speed + " MPH";

                    // get UV index 
                    let lat = data.coord.lat;
                    let lon = data.coord.lon;
                    let UVurl = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon +  "&appid=" + apiKey;
                    fetch(UVurl)
                        .then(function(response){
                            response.json().then(function(data){
                            
                            // add UV index to dom
                            UVindex = document.querySelector("#UV-index")
                            UVindex.innerHTML = "UV-index: " + data[0].value;
                            
                            // UV index is favorable, show green
                            if (data[0].value < 4){
                                UVindex.classList.add("bg-success", "text-light");
                            } 
                            // UV index is moderate, show yellow
                            else if(data[0].value < 8) {
                                UVindex.classList.add("bg-warning", "text-light");
                            } 
                            // UV index is severe, show red 
                            else {
                                UVindex.classList.add("bg-danger", "text-light");
                            }
                    })}
                    
                )});
            }
            // response unsucessful 
            else{
                alert("Error: did not recognize City");
            }
        })
        .catch(function(error){
            alert("Unable to connect to Weather.com")
        })
};

// get forecast weather data
var getForecastWeather = function(cityName){
    var apiUrl = "api.openweathermap.org/data/2.5/forecast/daily?q=" + cityName + "&cnt=" //daysOut + "&appid=" + apiKey;
};

// function to convert kelvin to ferinheight
var k2f = function(k){
    return Math.floor((k - 273.15) * 1.8 + 32)
};


// add event listeners to submit button
searchBtn.addEventListener("click", formSubmitHandler)
