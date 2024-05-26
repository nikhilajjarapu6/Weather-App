const container = document.querySelector('.container');
const search = document.querySelector('.search');
const weather = document.querySelector('.weather');
const quality = document.querySelector('.quality');
const humidity = document.querySelector('.quality .first .humidity');
const airspeed = document.querySelector('.quality .second .air-speed');
const degrees = document.querySelector('.temparature .one');
const img = document.querySelector('.image .imagesrc');
const description = document.querySelector('.temparature .two');
const errordiv = document.querySelector('.error');
const APIKey = '5d9a008eb24af2826aa49953589084cb';


function fetchWeather(city) {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;

    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            if (data.cod === '404') {
                weather.classList.remove('active');
                errordiv.classList.add('active');
                return;
            }
            weather.classList.add('active');
            errordiv.classList.remove('active');

            humidity.textContent = `${data.main.humidity}%`;
            degrees.innerHTML = `${(data.main.temp - 273.15).toFixed(2)} &#8451;`;
            airspeed.textContent = `${data.wind.speed} Km/h`;

            switch (data.weather[0].main) {
                case 'Clear':
                    img.src = 'clear.png';
                    break;
                case 'Rain':
                    img.src = 'rain.png';
                    break;
                case 'Snow':
                    img.src = 'snow.png';
                    break;
                case 'Clouds':
                    img.src = 'cloud.png';
                    break;
                case 'Mist':
                    img.src = 'mist.png';
                    break;
                case 'Haze':
                    img.src = 'mist.png';
                    break;
                default:
                    img.src = 'clear.png';
                    break;
            }
            console.log(data);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
}

search.addEventListener('click', () => {
    let city = document.querySelector('.city').value.trim();
    if (city === '') {
        return;
    }
    fetchWeather(city);
});

document.addEventListener('DOMContentLoaded', () => {
    const defaultCity = 'india';  
    fetchWeather(defaultCity);
});
