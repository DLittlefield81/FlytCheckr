//PRODUCTION KEYS
let amadeusAPIPRO = "Yz40XpPPF1A6wBmSyKGXFZ14APg8YzKn"
let amadeusSecretPRO = "epwYQi2IySzrzYpv"
//TEST KEYS
let amadeusAPITEST = "zDja0gkGTDEEGjKOOGoGFU1ayCLA4HC6"
let amadeusSecretTEST = "ao5dBkMQVwAKmhPr"
//TOKEN
//TOKENS EXPIRE AFTER 30MINS IN TEST ENVIRONMENT
let amadeusTokenTEST = "A1ZF9vVYSQJ8NfJljC5V0kJKSyNV"

//VARIABLBLES
const inputOrigin = document.getElementById('input-origin').value;
const inputDestination = document.getElementById('input-destination').value;
const btnSearch = document.getElementById("button-locate");
const buildOriginList = document.getElementById("nearest-airports");
//const btnFastGetaway = document.getElementById("button-getaway");
const btnSubmit = document.getElementById("button-submit");



//START APP
let app = {
    init: () => {


        let inputDate = moment().format('YYYY-MM-DD');
        document.getElementById("input-date").value = inputDate


        //BUTTON LISTENERS
        btnSearch.addEventListener('click', app.getUserLocation);
        btnSubmit.addEventListener('click', app.getUserByCity);
        //btnFastGetaway.addEventListener('click', app.fastGetaway);


    },
    getUserLocation: (event) => {
        event.preventDefault();
        //GeoLocate
        // Turn longitude Latitude into IATA Code
        // Turn City Name into IATA CODE
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getNearestAirports);

        } else {
            //x.innerHTML = "Geolocation is not supported by this browser.";
        }

        function getNearestAirports(position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            console.log(lat, lon);
            //Get city from latitude and longitude
            let uvQueryURL = `https://test.api.amadeus.com/v1/reference-data/locations/airports?latitude=${lat}&longitude=${lon}&radius=500&page%5Blimit%5D=10&page%5Boffset%5D=0&sort=distance`;

            fetch(uvQueryURL, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + amadeusTokenTEST,
                }
            }
            )
                .then(resp => {
                    if (!resp.ok) throw new Error(resp.statusText);
                    return resp.json();
                })
                .then(data => {
                    createOriginList(data);
                })
                .catch(console.err);
        }
        function createOriginList(NearestData) {
            console.log("Create Origin Dropdown with Nearest Airports");
            console.log(NearestData);
            
            buildOriginList.innerHTML = "";
            document.getElementById('input-origin').placeholder = "Select From List";
            for (let i = 0; i < NearestData.data.length; i++) {
                
               
                //Build list of origin cities
                const originOption = document.createElement("OPTION");
                originOption.setAttribute("value", NearestData.data[i].name);
                buildOriginList.appendChild(originOption);
            }
        }
    },

    getUserByCity: () => {
        let inputOrign = document.getElementById("input-origin").value
        console.log(inputOrign);
    },
    showUserLocation: () => {




        /* do something*/

        //Show Users Longitude/Latitude





        //Get Nearest Airport
        //get current Longitude/Latitude and set closest airport




    },
    nearestAirport: () => {
        //Get Nearest Airport
        //get current Longitude/Latitude and set closest airport




    },
    fastGetaway: (event2) => {
        event2.preventDefault();
        //Set Fast Getaway
        //Fast Getaway sets date to Today then checks for flights








    },
    standardLookup: () => {
        //user enters origin, dropdown populates with destination options
        inputOrigin


    },
    errorHandler: () => {
        //user enters origin, dropdown populates with destination options



    }

};
app.init();








let modeBtn = document.getElementById("modeBtn");

modeBtn.addEventListener("click", modeSwitcher);

function modeSwitcher(){
    if (modeBtn.value === "darkMode") {
        modeBtn.value = "lightMode";
        document.querySelector("nav").classList.remove("bg-dark");
        document.querySelector("nav").classList.add("bg-light");
        document.querySelector("nav").classList.remove("text-light");
        document.querySelector("nav").classList.add("text-dark");

        document.querySelector("table").classList.remove("has-background-dark");
        document.querySelector("table").classList.add("has-background-light");
        document.querySelector("table").classList.remove("has-text-light");
        document.querySelector("table").classList.add("has-text-dark");

        document.querySelectorAll("th").forEach(element => element.classList.remove("has-text-light"));
        document.querySelectorAll("th").forEach(element => element.classList.add("has-text-dark"));

        document.body.style.backgroundColor = "white";
        document.getElementById("modeBtn").style.backgroundColor = "white";
        document.getElementById("btn-clearhistory").style.backgroundColor = "white";
        

    } else {
        modeBtn.value = "darkMode";
        document.querySelector("nav").classList.remove("bg-light");
        document.querySelector("nav").classList.add("bg-dark");
        document.querySelector("nav").classList.remove("text-dark");
        document.querySelector("nav").classList.add("text-light");

        document.querySelector("table").classList.remove("has-background-light");
        document.querySelector("table").classList.add("has-background-dark");
        document.querySelector("table").classList.remove("has-text-dark");
        document.querySelector("table").classList.add("has-text-light");

        document.querySelectorAll("th").forEach(element => element.classList.remove("has-text-dark"));
        document.querySelectorAll("th").forEach(element => element.classList.add("has-text-light"));

        document.body.style.backgroundColor = "rgba(54,54,54,255)";
        document.getElementById("modeBtn").style.backgroundColor = "rgba(54,54,54,255)";
        document.getElementById("btn-clearhistory").style.backgroundColor = "rgba(54,54,54,255)";

}
}
























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