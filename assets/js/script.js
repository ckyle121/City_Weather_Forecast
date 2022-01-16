// API key 
apiKey = "581ce92b85fceec3c210d9faa500eccb"

// variables to reference dom
dailyWeatherEl = document.querySelector("#daily-weather")
searchBtn = document.querySelector("#search-btn");
cityNameInputEl = document.querySelector("#cityName");
forecastContainerEl = document.querySelector("#forecast-weather");


// function to handle city submit
var formSubmitHandler = function(event){
    // prevent page from refresh
    event.preventDefault();

    // get vallue from input element
    var cityName = cityNameInputEl.value.trim();

    if (cityName){
        getDailyWeather(cityName);

        // clear old serach content
        
    } else{
        alert("Did not Recognize City Name");
    }
}

// function to get daily weather temp, wind, humidity
var getDailyWeather = function(cityName){
    // format weather api url 
    var apiUrl = "api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

    // make a request to get data from url
    fetch(apiUrl)
        .then(function(response){
            if (response.ok){
                console.log(response);
            } else{
                alert("Sorry, did not recognize City");
            }
        })
        .catch(function(error){
            alert("Unable to connect to Weather.com")
        })
};

// add event listeners to submit button
searchBtn.addEventListener("submit", formSubmitHandler)