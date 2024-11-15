document.getElementById(`getWeather`).addEventListener(`click`, async () => {
    const city = document.getElementById(`city`).value;
    const apiKey="8537ba9c438c4d3bb75133621243110";
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.log(`Sorry For Issue Some Error Occured`);
            console.log(`Kindly Check Spell Mistakes`);
            console.log(`If Issue Still Occurs Please Wait OR Contact Developer`);
            document.getElementById(`moreResult`).style.display = `none`;
            document.getElementById(`moreDetails`).style.display = `none`;
            document.getElementById(`lessDetails`).style.display = `none`;
            throw new Error(`
                <p style="margin-top: 1%;">
                    Unable to retrieve weather data.
                </p>
                <p style="margin-top: 1%;">
                    Please check the city name and try again.
                </p>
            `);
        }

        const data = await response.json();

        // Choosing The Fields To Show On Webpage
        const weather = `
            <h2>Weather in ${data.location.name}, ${data.location.country}</h2>
            <p>Temperature: ${Math.round(data.current.temp_c)} °C</p>
            <p>Condition: ${data.current.condition.text}</p>
        `;
        // Printing Desired Categories On Webpage
        document.getElementById(`weatherResult`).innerHTML = weather;
        console.log(`Current Temperature In ${data.location.name} Is ${data.current.temp_c} °C`);

        // Store weather details for later use
        window.weatherDetails = data;
        
        document.body.style.height = `100vh`;
        document.getElementById(`moreResult`).style.display = `block`;
        document.getElementById(`moreDetails`).style.display = `block`;
        document.getElementById(`lessDetails`).style.display = `none`;
        document.getElementById(`footer`).style.fontSize =`larger`

    } catch (error) {
        document.getElementById(`weatherResult`).innerHTML = error.message;
    }
});

async function showMore() {
    if (!window.weatherDetails) return;
    document.body.style.height = `125vh`;
    const data = window.weatherDetails;
    const currentWeatherInfo = data.current;
    const weatherDetail = `
        <h2>Weather in ${data.location.name}</h2>
        <p>Temperature: ${Math.round(currentWeatherInfo.temp_c)} °C</p>
        <p>Temperature: ${Math.round(currentWeatherInfo.temp_f)} °F</p>
        <p>Condition: ${currentWeatherInfo.condition.text}</p>
        <p>Wind Speed: ${Math.round(currentWeatherInfo.wind_mph)} mph</p>
        <p>Wind Speed: ${Math.round(currentWeatherInfo.wind_kph)} kph</p>
        <p>Wind Degree: ${Math.round(currentWeatherInfo.wind_degree)}°</p>
        <p>Wind Direction: Towards ${currentWeatherInfo.wind_dir}</p>
    `;
    document.getElementById(`weatherResult`).innerHTML = weatherDetail;
    document.getElementById(`moreDetails`).style.display = `none`;
    document.getElementById(`lessDetails`).style.display = `block`;
    document.getElementById(`footer`).style.fontSize =`large`
    
}

function showLess() {
    if (!window.weatherDetails) return;
    document.body.style.height = `100vh`

    const data = window.weatherDetails;
    const weatherDetail = `
        <h2>Weather in ${data.location.name}</h2>
        <p>Temperature: ${Math.round(data.current.temp_c)} °C</p>
        <p>Condition: ${data.current.condition.text}</p>
    `;
    document.getElementById(`moreDetails`).style.display = `block`;
    document.getElementById(`lessDetails`).style.display = `none`;
    document.getElementById(`footer`).style.fontSize =`larger`
    document.getElementById(`weatherResult`).innerHTML = weatherDetail;
}
