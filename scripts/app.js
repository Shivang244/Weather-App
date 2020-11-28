//For DOM manipulation

const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

//create a function to update UI
const updateUI = (data) => {
    const cityDets = data.cityDets;
    const weather = data.weather;

    //update details template class in html
    //notice the template quotations
    details.innerHTML = ` 
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <!--display-4 makes text bigger
            div for temp-->
            <span>${weather.Temperature.Metric.Value}</span>
            <span> &deg;C </span>
        </div>
    `; 

    //Update the night/day & icon images:
    const iconsrc = `icons/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src',iconsrc);

    let timesrc = null;
    if(weather.IsDayTime){
        timesrc = 'icons/icons/day.svg';
    }else{
        timesrc = 'icons/icons/night.svg';
    }

    time.setAttribute('src',timesrc);

    //remove d-none class fom div if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    };

};



const updateCity = async (city) => {
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {
        cityDets: cityDets,
        weather: weather
    }; //return a promise

};
cityForm.addEventListener('submit', e => {
    //prevent default action of refresh
    e.preventDefault();

    //get City value
    const city = cityForm.city.value.trim();
    //clear out the form
    cityForm.reset();

    //update the ui with new city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));


})