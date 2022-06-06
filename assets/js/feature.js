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
            createLinkToBook(data);

        })
        .catch(console.err);
    };
carrierAirline()