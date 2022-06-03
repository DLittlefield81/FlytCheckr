//PRODUCTION KEYS
let amadeusAPIPRO = "Yz40XpPPF1A6wBmSyKGXFZ14APg8YzKn"
let amadeusSecretPRO = "epwYQi2IySzrzYpv"
//TEST KEYS
let amadeusAPITEST = "zDja0gkGTDEEGjKOOGoGFU1ayCLA4HC6"
let amadeusSecretTEST = "ao5dBkMQVwAKmhPr"
//TOKEN
//TOKENS EXPIRE AFTER 30MINS IN TEST ENVIRONMENT
let amadeusTokenTEST = "tili7hiSLs61RRRoIw5GKsueUaWi"

//VARIABLBLES
let startLocation = "";
const inputOrigin = document.getElementById('input-origin').value;
const inputDestination = document.getElementById('input-destination').value;
const btnSearch = document.getElementById("button-locate");
const buildOriginList = document.getElementById("nearest-airports");
const buildDestinationList = document.getElementById("destination-airports");
const notificationMessage = document.getElementById("notification-message");
//const btnFastGetaway = document.getElementById("button-getaway");
const btnSubmit = document.getElementById("button-submit");



//START APP
let app = {
    init: () => {
        console.log("Let the fun begin! App Begining");


        let inputDate = moment().format('YYYY-MM-DD');
        document.getElementById("input-date").value = inputDate


        //BUTTON LISTENERS
        btnSearch.addEventListener('click', app.getUserLocation);
        btnSubmit.addEventListener('click', app.getUserByCity);
        //btnFastGetaway.addEventListener('click', app.fastGetaway);


    },

    getUserLocation: (event) => {
        console.log("Starting getUserLocation function ");
        event.preventDefault();

        if (localStorage.getItem('startLocation') !== null) {
            //Ask to use previous coords and retrieve from LocalStorage
            console.log("Using Existing Local Storage");
            startLocation = localStorage.getItem('startLocation');
            getNearestAirports()
        } else {
            //does Fetch for coords
            console.log(`Fetching Coordinates`);
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(setCoordinatesToStorage);
                function setCoordinatesToStorage(position) {
                    lat = position.coords.latitude;
                    lon = position.coords.longitude;
                    console.log(lat, lon);
                    startLocation = `latitude=${lat}&longitude=${lon}`
                    localStorage.setItem('startLocation', startLocation);
                    getNearestAirports()
                }

            } else {
                //x.innerHTML = "Geolocation is not supported by this browser.";
                app.init();
            }
        }
        function getNearestAirports() {
            console.log("getting nearest airports data");
            //check if coordinates are stored to localstorage
            console.log(startLocation);


            //Get city from latitude and longitude

            let originsURL = `https://test.api.amadeus.com/v1/reference-data/locations/airports?${startLocation}&radius=500&page%5Blimit%5D=10&page%5Boffset%5D=0&sort=distance`;
            console.log(originsURL);
            fetch(originsURL, {
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
        function createOriginList(originsData) {
            console.log("Creating dropdown list of Nearest Origin Airports");
            console.log(originsData);
            app.populateDestinations();
            console.log("I am here")
            buildOriginList.innerHTML = "";
            document.getElementById('input-origin').placeholder = "Select From List";
            for (let i = 0; i < originsData.data.length; i++) {


                //Build list of origin cities
                const originOption = document.createElement("OPTION");
                originOption.setAttribute("value", originsData.data[i].name);
                buildOriginList.appendChild(originOption);
            }
        }
    },

    populateDestinations: () => {
        console.log("Starting populateDestinations Function");
        let IATAcode = "YYZ" //document.getElementById("origin-airports").value
        // if (typeof IATAcode !== "undefined") {

        //     getDestinationAirports() ;

        // } else {
        //     //x.innerHTML = "Geolocation is not supported by this browser.";
        // }


        //Get city from latitude and longitude
        let destinationsURL = `https://test.api.amadeus.com/v1/airport/direct-destinations?departureAirportCode=${IATAcode}`;

        fetch(destinationsURL, {
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
                createDestinationList(data);
            })
            .catch(console.err);

        function createDestinationList(destinationData) {
            console.log("Creating dropdown list of Serviced Destination Airports");
            console.log(destinationData);

            buildDestinationList.innerHTML = "";
            document.getElementById('input-destination').placeholder = "Select From List";
            for (let i = 0; i < destinationData.data.length; i++) {


                //Build list of origin cities
                const destinationOption = document.createElement("OPTION");
                destinationOption.setAttribute("value", destinationData.data[i].name);
                buildDestinationList.appendChild(destinationOption);
            }
        }











    },

    originSelected: () => {
        console.log("");
        //User enters city name, or selects from dropdown -- origin sets IATA Code -- IATA Code limits Destinations
        let IATAcode = input.value
        console.log(IATAcode);
    },

    nearestAirport: () => {
        console.log("");
        //Get Nearest Airport
        //get current Longitude/Latitude and set closest airport




    },

    fastGetaway: (event2) => {
        console.log("");
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