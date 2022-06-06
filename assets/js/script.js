//TOKEN
//TOKENS EXPIRE AFTER 30MINS IN TEST ENVIRONMENT
let amadeusTokenTEST = "gYAX6ZaSVZc6fMnMEJecxrSoou9S"

//VARIABLBLES
let carrierCode = "";
let startLocation = "";
let airlineBookingURL = "DL BLANK TAG";
const inputLookup = document.getElementById('input-lookup').value;
const btnSearch = document.getElementById("button-locate");
const containerLookup = document.getElementById("container-lookup");
const containerOrigin = document.getElementById("container-origin");
const containerDestination = document.getElementById("container-destination");
const modalWindowContent = document.getElementById("modal-content");
const notificationTitle = document.getElementById("notification-title");
const notificationMessage = document.getElementById("notification-message");
const btnClearHistory = document.getElementById("button-clearhistory");
const btnSubmit = document.getElementById("button-submit");


//START APP
let app = {
    init: () => {
        console.log("Let the fun begin! App Begining");


        let inputDate = moment().format('YYYY-MM-DD');
        document.getElementById("input-date").value = inputDate

        //Check for LocalStorage Item
        if (localStorage.getItem("startLocation") === null) {
            console.log("Item does not exist in localstoarge");

        } else {
            console.log("Item exists in localstorage");
            document.getElementById('input-lookup').value = localStorage.getItem('startLocation');
            app.standardLookup();
        }
        //LISTENERS
        document.getElementById("modeBtn").addEventListener("click", app.modeSwitcher);
        document.getElementById("input-lookup").addEventListener("focusout", app.standardLookup);
        document.getElementById("input-lookup").addEventListener("keypress", function (event) {

            if (event.key === "Enter") {
                app.standardLookup();
            }
        });


        btnSearch.addEventListener('click', app.fetchCoords);
        btnSubmit.addEventListener('click', app.populateGrid);
        btnClearHistory.addEventListener('click', app.clearHistory);


    },

    standardLookup: () => {
        console.log("Starting Standard Lookup")
        // on loseFocus retrieves a list of airports matching search name
        let inputLookup = document.getElementById('input-lookup').value

        let lookupURL = `https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT,CITY&keyword=${inputLookup}&page%5Blimit%5D=10&page%5Boffset%5D=0&sort=analytics.travelers.score&view=FULL`;
        console.log(lookupURL);
        fetch(lookupURL, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + amadeusTokenTEST,
            }
        })
            
            .then(resp => {
                if (!resp.ok) throw new Error(resp.statusText);
                return resp.json();
            })
            .then(data => {
                createLookupList(data);
            })
            .catch(console.err);
        function createLookupList(lookupData) {
            console.log("Creating dropdown list of Nearest Origin Airports");
            console.log(lookupData);
            containerOrigin.innerHTML = ""; //gets rid of input box to create dropdown list
            //create Select Dropdown
            const selectboxLookup = document.createElement("select");
            selectboxLookup.setAttribute("id", "select-origin");
            selectboxLookup.setAttribute("placeholder", "Select Airport");
            selectboxLookup.setAttribute("class", "form-control mr-sm-2 demo");
            selectboxLookup.setAttribute("onclick", "app.populateDestinations()");
            const lookupOption = document.createElement("OPTION");
            lookupOption.innerHTML = "Select Nearby Airport";
            lookupOption.setAttribute("hidden", "true");
            lookupOption.setAttribute("disabled", "disabled");
            selectboxLookup.appendChild(lookupOption);
            containerOrigin.appendChild(selectboxLookup);
            //create origin airport options
            for (let i = 0; i < lookupData.data.length; i++) {
                const lookupOption = document.createElement("OPTION");
                lookupOption.setAttribute("value", lookupData.data[i].iataCode);
                lookupOption.innerHTML = "[" + lookupData.data[i].iataCode + "] " + lookupData.data[i].name;
                selectboxLookup.appendChild(lookupOption);
            }
        }
    },

    fetchCoords: () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(setCoordinatesToStorage);
            function setCoordinatesToStorage(position) {
                lat = position.coords.latitude;
                lon = position.coords.longitude;
                console.log(lat, lon);
                startLocation = `latitude=${lat}&longitude=${lon}`

                app.nearestAirport()
            }
        } else {
            //x.innerHTML = "Geolocation is not supported by this browser.";
            app.init();
        }
    },

    nearestAirport: () => {
        console.log("Starting nearest airport function");
        console.log(startLocation);
        //Get city from latitude and longitude
        console.log("getting nearest airports data");
        let originsURL = `https://test.api.amadeus.com/v1/reference-data/locations/airports?${startLocation}&radius=500&page%5Blimit%5D=10&page%5Boffset%5D=0&sort=distance`;
        console.log(originsURL);
        fetch(originsURL, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + amadeusTokenTEST,
            }
        })
            .then(resp => {
                if (!resp.ok) throw new Error(resp.statusText);
                return resp.json();
            })
            .then(data => {
                createOriginList(data);
            })
            .catch(console.err);

        function createOriginList(originsData) {
            console.log("Creating dropdown list of Nearest Origin Airports");
            console.log(originsData);
            containerOrigin.innerHTML = ""; //gets rid of input box to create dropdown list
            //create Select Dropdown
            const selectboxOrigin = document.createElement("select");
            selectboxOrigin.setAttribute("id", "select-origin");
            selectboxOrigin.setAttribute("placeholder", "Select Airport");
            selectboxOrigin.setAttribute("class", "form-control mr-sm-2 demo");
            selectboxOrigin.setAttribute("onfocusout", "app.populateDestinations()");
            const originOption = document.createElement("OPTION");
            originOption.innerHTML = "Select Nearby Airport";
            originOption.setAttribute("hidden", "true");
            originOption.setAttribute("disabled", "disabled");
            selectboxOrigin.appendChild(originOption);
            containerOrigin.appendChild(selectboxOrigin);
            //create origin airport options
            for (let i = 0; i < originsData.data.length; i++) {
                const originOption = document.createElement("OPTION");
                originOption.setAttribute("value", originsData.data[i].iataCode);
                originOption.innerHTML = "[" + originsData.data[i].iataCode + "] " + originsData.data[i].name;
                selectboxOrigin.appendChild(originOption);
            }
        }
    },

    populateDestinations: () => {
        console.log("Starting populateDestinations Function");
        //Set Selected Origin to LocalStorage
        let IATAcode = document.getElementById("select-origin").value;
        localStorage.setItem('startLocation', IATAcode);
        //Get city from latitude and longitude
        let destinationsURL = `https://test.api.amadeus.com/v1/airport/direct-destinations?departureAirportCode=${IATAcode}`;
        fetch(destinationsURL, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + amadeusTokenTEST,
            }
        })
            .then(resp => {
                if (!resp.ok) throw new Error(resp.statusText);
                return resp.json();
            })
            .then(data => {
                createDestinationList(data);
            })
            .catch(console.err);

        function createDestinationList(destinationData) {
            console.log("Creating dropdown list of Serviced Destinations");
            console.log(destinationData);
            containerDestination.innerHTML = ""; //gets rid of input box to create dropdown list
            //create Select Dropdown
            const selectboxDestination = document.createElement("select");
            selectboxDestination.setAttribute("id", "select-destinationAirports");
            selectboxDestination.setAttribute("placeholder", "Select Destination");
            selectboxDestination.setAttribute("class", "form-control mr-sm-2 demo");
            const destinationOption = document.createElement("OPTION");
            destinationOption.innerHTML = "Select Destination";
            destinationOption.setAttribute("hidden", "true");
            destinationOption.setAttribute("disabled", "disabled");
            selectboxDestination.appendChild(destinationOption);
            containerDestination.appendChild(selectboxDestination);
            //create origin airport options

            if (destinationData.data.length != 0) {
                for (let i = 0; i < destinationData.data.length; i++) {
                    const destinationOption = document.createElement("OPTION");
                    destinationOption.setAttribute("value", destinationData.data[i].iataCode);
                    destinationOption.innerHTML = "[" + destinationData.data[i].iataCode + "] " + destinationData.data[i].name;
                    selectboxDestination.appendChild(destinationOption);
                }
            } else {
                destinationOption.innerHTML = "No Destinations Available";

            }
        }

    },

    populateGrid: () => {
        console.log("Starting PopulateGrid Function");
        //User enters city name, or selects from dropdown -- origin sets IATA Code -- IATA Code limits Destinations
        //ORIGIN
        let iataOrigin = document.getElementById("select-origin").value;
        console.log(iataOrigin);
        let iataDestination = document.getElementById("select-destinationAirports").value;
        console.log(iataDestination);
        let travelDate = document.getElementById("input-date").value;
        console.log(travelDate);

        function carrierAirline(carrierCode, linkToBookEl) {
            //let carrierCode = "F9"
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Host': 'iata-and-icao-codes.p.rapidapi.com',
                    'X-RapidAPI-Key': 'bf98be93bcmsh29c5cad60fcbe7cp1c13e7jsnffaac73a1ecd'
                }
            };
        
            fetch(`https://iata-and-icao-codes.p.rapidapi.com/airline?iata_code=${carrierCode}`, options)
                .then(resp => {
                    if (!resp.ok) throw new Error(resp.statusText);
                    return resp.json();
                })
                .then(data => {
                    console.log("Data Retrieved for Fare Matrix");
                    airlineBookingURL = data[0].name.split(" ").join("");
                    linkToBookEl.innerHTML = `<a href="https://${airlineBookingURL}.com" target="_blank"><button class="btn btn-outline-success my-2 my-sm-0 text-light">Book Ticket</button></a>`;
                   
        
                })
                .catch(console.err);
            };

        //DESTINATION

        let destinationsURL = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${iataOrigin}&destinationLocationCode=${iataDestination}&departureDate=${travelDate}&adults=1&travelClass=ECONOMY&nonStop=true&max=250`;
        fetch(destinationsURL, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + amadeusTokenTEST,
            }
        })
            .then(resp => {
                if (!resp.ok) throw new Error(resp.statusText);
                return resp.json();
            })
            .then(data => {
                console.log("Data Retrieved for Fare Matrix");
                createFareMatrix(data);

            })
            .catch(console.err);


        function createFareMatrix(fareMatrixData) {
            console.log("Creating Fare Matrix");
            console.log(fareMatrixData);

            //Clear Table on New Search
            if (document.getElementById('table-fareMatrix').rows.length > 1) {
                for (let r = 1; r < document.getElementById('table-fareMatrix').rows.length; r++) {
                    console.log("Clearing Existing Matrix");
                    document.getElementById("table-fareMatrix").deleteRow(r);
                }
            }
            for (let i = 0; i < fareMatrixData.data.length; i++) {
                
                var table = document.getElementById("table-fareMatrix");
                var row = table.insertRow();
                var carrier = row.insertCell();
                var timeDept = row.insertCell();
                var timeArr = row.insertCell();
                var timeTot = row.insertCell();
                var price = row.insertCell();
                var linkToBook = row.insertCell();
                carrier.setAttribute("class", "text-white");
                carrier.innerHTML = `<img src="https://daisycon.io/images/airline/?width=150&height=100&iata=${fareMatrixData.data[i].validatingAirlineCodes[0]}" alt="${fareMatrixData.data[i].validatingAirlineCodes[0]}">`;
                timeDept.setAttribute("class", "text-white");
                timeDept.innerHTML = fareMatrixData.data[i].itineraries[0].segments[0].departure.at.slice(0, 10) + "<br>" + fareMatrixData.data[i].itineraries[0].segments[0].departure.at.slice(11);
                timeArr.setAttribute("class", "text-white");
                timeArr.innerHTML = fareMatrixData.data[i].itineraries[0].segments[0].arrival.at.slice(0, 10) + "<br>" + fareMatrixData.data[i].itineraries[0].segments[0].arrival.at.slice(11);
                timeTot.setAttribute("class", "text-white");
                timeTot.innerHTML = fareMatrixData.data[i].itineraries[0].duration.slice(2);
                price.setAttribute("class", "text-white");
                price.innerHTML = fareMatrixData.data[i].price.total + "<br>";
                linkToBook.setAttribute("class", "text-white");
                carrierAirline(fareMatrixData.data[i].validatingAirlineCodes[0], linkToBook);
           }
    

        }

    },



    convertCurrency: () => {
        console.log("Currency Converter Started");

        var myHeaders = new Headers();
        myHeaders.append("apikey", "OIcMcHi6isYEUys1SbJ7MAtEOgI1151B");

        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders
        };


        fetch("https://api.apilayer.com/currency_data/convert?to={to}&from={from}&amount={amount}", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

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










    },

    clearHistory: () => {
        console.log("Cleared Application LocalStorage");
        localStorage.clear();
        location.reload();
    },

    notificationMessageHandler: (messageType) => {
//Notification Message
        switch (messageType) {
            case Message:
                document.getElementById("notification-container").setAttribute("class", "alert alert-success alert-dismissible fade show");
                document.getElementById("notification-container").setAttribute("role", "alert");
                break;
            case Alert:
                document.getElementById("notification-container").setAttribute("class", "alert alert-danger alert-dismissible fade show");
                document.getElementById("notification-container").setAttribute("role", "alert");
                break;
            case Error:
                document.getElementById("notification-container").setAttribute("class", "alert alert-warning alert-dismissible fade show");
                document.getElementById("notification-container").setAttribute("role", "alert");
                break;
        }
    },
    modeSwitcher: () => {
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
            document.getElementById("button-clearhistory").style.backgroundColor = "white";


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
            document.getElementById("button-clearhistory").style.backgroundColor = "rgba(54,54,54,255)";

        }
    }
};

app.init();
