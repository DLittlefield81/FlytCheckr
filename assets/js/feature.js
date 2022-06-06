function convertCurrency() {
    console.log("Currency Converter Started");

    var myHeaders = new Headers();
    myHeaders.append("apikey", "OIcMcHi6isYEUys1SbJ7MAtEOgI1151B");

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    fetch(`https://api.apilayer.com/currency_data/convert?to=${to}&from=${from}&amount=${amount}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}

let amadeusTokenTEST = "1myn9L2tjIIBl2AcTBDRk7T3nKTZ"

function CarrierAirline() {

    let carrierCodeURL = `https://test.api.amadeus.com/v1/reference-data/airlines?airlineCodes=${carrierCode}`;
    fetch(carrierCodeURL, {
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
}
