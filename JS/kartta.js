let geojson;
let map;
const proxy = 'https://cors-anywhere.herokuapp.com/';


// Settings for location search (optional)
const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

// Function that is run when location is found
function success(pos) {
    const crd = pos.coords;

    // Print current position to console
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    // Creates a new map using gotten coordinates
    createMap(crd.latitude, crd.longitude);
}

// Function that is run when there was an error finding a location
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    //If user denied Geolocation, create map on lat 61 and lon 25
    createMap(61,25);
}

// Start location search
navigator.geolocation.getCurrentPosition(success, error, options);

// Function that creates map at specified lat and lon
function createMap(lat, lon) {
    //Initializing map and setting coordinates and zoom level
    map = L.map('map1').setView([lat, lon], 7);

    //Adds layer to map
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/satellite-v9',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoidGhla2VudHMiLCJhIjoiY2todnV6ZTA4MWhvbzJxbGh4ajI0Y2x4ayJ9.7AlWsPXyZBj2IatCVfjnVg'
    }).addTo(map);

    //Gets GeoJSON data and adds them to the map
    geojson = L.geoJson(maakunnat, {
        onEachFeature: onEachFeature
    }).addTo(map);
    geojson.addEventListener("click", onClick);
}
//If mouse on GeoJSON layer, highlight
function highlight(event) {
    let layer = event.target;

    layer.setStyle({
        weight: 5,
        color: '#00BFFF',
        dashArray: '',
        fillOpacity: 0.7
    });
}
//Resets highlight when mouse exits GeoJSON layer
function resetHighlight(event) {
    geojson.resetStyle(event.target);
}
//Tells GeoJSON layers what to do on mouseover and mouseout
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlight,
        mouseout: resetHighlight
    });
}
//Function that runs when a layer on the map is clicked
function onClick(event) {
    //Gets clicked GeoJSON layers maakunta
    let maakunta = event.sourceTarget.feature.properties.Maakunta;
    const art1 = document.getElementById("art1");
    const new_art = document.createElement("article");
    new_art.setAttribute("id", "art4");
    new_art.innerHTML = `<h4>
            Etsitään autoja, Odota hetki...
         </h4>`;
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        // If everything is alright on connection, executes
        if (this.readyState == 4 && this.status == 200) {
            new_art.innerHTML = xhttp.responseText;
            console.log(xhttp.responseText);
        }
    };
    art1.replaceWith(new_art);
    //Performs php search
    xhttp.open("GET", proxy+"http://users.metropolia.fi/~kenertml/haku.php?maakunta="+maakunta, true);
    xhttp.send();
}