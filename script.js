document.addEventListener("DOMContentLoaded", function () { 
    const container = document.querySelector('.container');
    const search = document.querySelector('.search-box button');
    const weatherBox = document.querySelector('.weather-box');
    const weatherDetails = document.querySelector('.weather-details');
    const error404 = document.querySelector('.not-found');
    const cityHide = document.querySelector('.city-hide');

    search.addEventListener('click', () => {
        const APIKey = '0de3884252c7acc5e7c5edd9961a6d8e'; 
        const city = document.querySelector('.search-box input').value; 

        if (city === '') return; 

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
            .then(response => response.json())
            .then(json => {
                if (json.cod === '404' || json.cod === '400' || json.message === 'city not found') {
                    cityHide.textContent = city;
                    container.style.height = '400px';
                    weatherBox.classList.remove('active');
                    weatherDetails.classList.remove('active');
                    error404.classList.add('active');
                    return;
                }
                
                cityHide.textContent = city;
                container.style.height = '555px'; 
                weatherBox.classList.add('active');
                weatherDetails.classList.add('active');
                error404.classList.remove('active');

                const image = document.querySelector('.weather-box img');
                const temperature = document.querySelector('.weather-box .temperature');
                const description = document.querySelector('.weather-box .description');
                const humidity = document.querySelector('.humidity span');
                const wind = document.querySelector('.wind span');

                switch (json.weather[0].main) {
                    case 'Clear':
                        image.src = 'https://www.pngarts.com/files/4/Sun-PNG-Image.png';
                        break;
                    case 'Rain':
                        image.src = 'http://cliparts.co/cliparts/kcK/n48/kcKn48EXi.png';
                        break;
                    case 'Snow':
                        image.src = 'https://webstockreview.net/images/clipart-snow-snow-cloud-12.png';
                        break;
                    case 'Clouds':
                        image.src = 'https://cdn0.iconfinder.com/data/icons/hotel-and-travel-2-1/52/56-512.png';
                        break;
                    case 'Mist':
                        image.src = 'https://cdn0.iconfinder.com/data/icons/weather-402/15/Vector-8-512.png';
                        break;
                    case 'Haze':
                        image.src = 'https://cdn1.iconfinder.com/data/icons/carbon-design-system-vol-4/32/haze-256.png';
                        break;
                    default:
                        image.src = 'https://www.pngarts.com/files/4/Sun-PNG-Image.png';
                }

                temperature.innerHTML = `${json.main.temp} <span>°C</span>`;
                description.innerHTML = json.weather[0].description;
                humidity.innerHTML = `${json.main.humidity}%`;
                wind.innerHTML = `${json.wind.speed} km/h`;
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                error404.classList.add('active');
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
            });
    });
});
