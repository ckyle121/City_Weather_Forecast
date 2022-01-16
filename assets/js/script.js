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

        // clear old serach content
        
    } else{
        alert("Please enter a City Name");
    }
}

// function to get daily weather temp, wind, humidity
var getDailyWeather = function(cityName){
    // format weather api url 
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=" + apiKey;

    // make a request to get data from url
    fetch(apiUrl)
        .then(function(response){
            // response was succesful
            if (response.ok){
                response.json().then(function(data){
                    console.log(data);

                    // add city name to header 
                    citySearchName.textContent = cityName;

                    // add temp to dom
                    temp = document.querySelector("#temperature");
                    temp.innerHTML = "Temperature: " + k2f(data.main.temp) + " F";

                    // add humidity to dom
                    humidity = document.querySelector("#humdity");
                    humidity.innerHTML = "Humidity: " + (main.humidity) + "%";

                    // add wind to dom 
                    wind = document.querySelector("#wind");
                    wind.innerHTML = "Wind Speed: " + (wind.speed) + " MPH";
                    
                });
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

// function to convert kelvin to ferinheight
var k2f = function(k){
    return Math.floor((k - 273.15) * 1.8 + 32)
};


// add event listeners to submit button
searchBtn.addEventListener("click", formSubmitHandler)
