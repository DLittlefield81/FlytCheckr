//Amadeus API
//curl -X GET 'https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=PAR&maxPrice=200' -H 'Authorization: Bearer {{token}}'
let amadeusAPI = "zDja0gkGTDEEGjKOOGoGFU1ayCLA4HC6"
let amadeusSecret = "ao5dBkMQVwAKmhPr"
let amadeusToken = "qVn3kY6aWl3wqMBkiIUNP7ZiruvN"

//Variables
let originCity = document.getElementById('originCity').value;
let destinationCity = document.getElementById('destinationCity').value;
let coordLon = document.getElementById('coordLon').value;
let coordLat = document.getElementById('coordLat').value;

//GeoLocate
// Turn longitude Latitude into IATA Code
// Turn City Name into IATA CODE






//Get Nearest Airport
//get current Longitude/Latitude and set closest airport



//Set Fast Getaway
//Fast Getaway sets date to Today then checks for flights



//






























let app = {
    init: () => {
        document
            .getElementById('btnSearch')
            .addEventListener('click', app.fetchFlights);
    },
    fetchFlights: () => {
        //        localStorage.setItem("search", JSON.stringify(searchHistory));
        let url = `https://test.api.amadeus.com/v1/airport/direct-destinations?departureAirportCode=${origin}&Bearer=${amadeusToken}`;
        console.log(url)
        fetch(url)
            method: Get
            .then(resp => {
                if (!resp.ok) throw new Error(resp.statusText);
                return resp.json();
            })
            .then(data => {
                app.showTravelOptions(data);

            })
            .catch(console.err);
    },
    showTravelOptions: (travelData) => {

        console.log(travelData); //Incoming Data
    }
};