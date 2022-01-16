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
                console.log(response);
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

// add event listeners to submit button
searchBtn.addEventListener("click", formSubmitHandler)
