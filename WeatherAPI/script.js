document.addEventListener('DOMContentLoaded', function() {

    const inputBox = document.querySelector('.input-box');
    const searchButton = document.getElementById('searchButton');
    const Weather_img = document.querySelector('.Weather-img');
    const temperature = document.querySelector('.temperature');
    const description = document.querySelector('.description');
    const humidity = document.getElementById('humidity');
    const wind_speed = document.getElementById('wind_speed');

    // Define an asynchronous function to fetch weather data for a given city
    async function checkWeather(city) {
        const api_key = "8c59bd0b15b9eaaad2f3211f307d8d42"; // Your OpenWeatherMap API key
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`; // Construct the API URL with the city and API key

        try {
            // Fetch the weather data from the API
            const response = await fetch(url);

            // Check if the response is not ok (e.g., status is not 200)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Parse the response data as JSON
            const weather_data = await response.json();

            // Check if the city is not found
            if (weather_data.cod === '404') {
                console.log("City not found");
                return;
            }

            // Update the UI with the fetched weather data
            temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`; // Convert temperature from Kelvin to Celsius
            description.innerHTML = weather_data.weather[0].description; // Set weather description
            humidity.innerHTML = `${weather_data.main.humidity}%`; // Set humidity
            wind_speed.innerHTML = `${weather_data.wind.speed} km/h`; // Set wind speed

            // Update the weather image based on the main weather condition
            switch (weather_data.weather[0].main) {
                case 'Clouds':
                    Weather_img.src = "assets/cloudy.jpg";
                    break;
                case 'Clear':
                    Weather_img.src = "assets/clear.png";
                    break;
                case 'Rain':
                    Weather_img.src = "assets/rainy.jpeg";
                    break;
                case 'Mist':
                    Weather_img.src = "assets/misty.jpg";
                    break;
                case 'Snow':
                    Weather_img.src = "assets/snowy.jpeg";
                    break;
                default:
                    Weather_img.src = "assets/default.jpeg";
            }

            // Log the weather data to the console for debugging
            console.log(weather_data);

        } catch (error) {
            // Log any errors to the console
            console.error('Error fetching weather data:', error);
        }
    }

    // Add an event listener to the search button to trigger the weather check when clicked
    searchButton.addEventListener('click', () => {
        checkWeather(inputBox.value); // Call the checkWeather function with the value from the input box
    });

});
