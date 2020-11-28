//For interacting with APIs

const key = 'cycXjCiVpaKILeGlYuWHQ2fdlWnxaQw4';

//get weather information
const getWeather = async(id) => {
    const base= "http://dataservice.accuweather.com/currentconditions/v1/";
    const query = id + "?apikey=" + key;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0]; //since it was an array object containing only 1 array

}

//getcity information
const getCity = async(city) => {
    const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
    const query = "?apikey=" + key + "&q=" + city;

    //fetch() returns a promise which is resolved by await
    const response = await fetch(base + query);

    //convert the response to json data
    const data = await response.json();

    return data[0];
    //returns a promise as it is async
};


/*
getCity("manchester").then(data => {
    return getWeather(data.Key);
}).then(data => {
    console.log(data);
}).catch(err => console.log(err));
*/
