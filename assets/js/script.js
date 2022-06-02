//PRODUCTION KEYS
let amadeusAPIPRO = "Yz40XpPPF1A6wBmSyKGXFZ14APg8YzKn"
let amadeusSecretPRO = "epwYQi2IySzrzYpv"
//TEST KEYS
let amadeusAPITEST = "zDja0gkGTDEEGjKOOGoGFU1ayCLA4HC6"
let amadeusSecretTEST = "ao5dBkMQVwAKmhPr"
//TOKEN
let amadeusTokenTEST = "qVn3kY6aWl3wqMBkiIUNP7ZiruvN"

//Variables
const inputOrigin = document.getElementById('input-origin').value;
const inputDestination = document.getElementById('input-destination').value;
const btnSearch = document.getElementById("button-locateMe");
const btnFastGetaway = document.getElementById("button-fastGetaway");
const btnSubmit = document.getElementById("button-submit");
//START APP
let app = {

    init: () => {

        btnSearch.addEventListener('click', app.getUserByGEO);
        btnFastGetaway.addEventListener('click', app.fastGetaway);
        //btnSubmit.addEventListener('click', app.standardLookup);

    },
    getUserByGEO: (event) => {
        event.preventDefault();
        //GeoLocate
        // Turn longitude Latitude into IATA Code
        // Turn City Name into IATA CODE

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(app.showUserLocation);
        } else {
            //x.innerHTML = "Geolocation is not supported by this browser.";
        }
        app.showUserLocation();


    },
    getUserByCity: () => {
        let inputOrign = document.getElementById("input-origin")
        conlsole.log(inputOrign);
    },
    showUserLocation: (position) => {
function checkFlag() {
    if (position === false) {
        window.setTimeout(checkFlag, 100); /* this checks the flag every 100 milliseconds*/
    } else {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        console.log(lat, lon);/* do something*/
    }
}
checkFlag();
        //Show Users Longitude/Latitude
        




    },
    nearestAirport: () => {
        //Get Nearest Airport
        //get current Longitude/Latitude and set closest airport




    },
    fastGetaway: (event2) => {
        event2.preventDefault();
        //Set Fast Getaway
        //Fast Getaway sets date to Today then checks for flights


        let inputDate = moment().format('YYYY-MM-DD');
        document.getElementById("input-date").value = inputDate
       




    },
    standardLookup: () => {
        
    }

};
app.init();






























// let app = {
//     init: () => {
//         document
//             .getElementById('btnSearch')
//             .addEventListener('click', app.fetchFlights);
//     },
//     fetchFlights: () => {
//         //        localStorage.setItem("search", JSON.stringify(searchHistory));
//         let url = `https://test.api.amadeus.com/v1/airport/direct-destinations?departureAirportCode=${origin}&Bearer=${amadeusToken}`;
//         console.log(url)
//         fetch(url)
//             method: Get
//             .then(resp => {
//                 if (!resp.ok) throw new Error(resp.statusText);
//                 return resp.json();
//             })
//             .then(data => {
//                 app.showTravelOptions(data);

//             })
//             .catch(console.err);
//     },
//     showTravelOptions: (travelData) => {

//         console.log(travelData); //Incoming Data
//     }
// };