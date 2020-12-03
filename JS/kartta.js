let geojson;
let map;
const proxy = 'https://cors-anywhere.herokuapp.com/';

// Asetukset paikkatiedon hakua varten (valinnainen)
const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

// Funktio, joka ajetaan, kun paikkatiedot on haettu
function success(pos) {
    const crd = pos.coords;

    // Tulostetaan paikkatiedot konsoliin
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    createMap(crd.latitude, crd.longitude);
}

// Funktio, joka ajetaan, jos paikkatietojen hakemisessa tapahtuu virhe
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    //If user denied Geolocation, create map on lat 61 and lon 25
    createMap(61,25);
}

// Käynnistetään paikkatietojen haku
navigator.geolocation.getCurrentPosition(success, error, options);

function createMap(lat, lon) {
    //Initializing map and setting coordinates and zoom level
    console.log(lat);
    console.log(lon);
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

    geojson = L.geoJson(maakunnat, {
        onEachFeature: onEachFeature
    }).addTo(map);
    geojson.addEventListener("click", onClick);
}
//If mouse on layer, highlight
function highlight(event) {
    let layer = event.target;

    layer.setStyle({
        weight: 5,
        color: '#00BFFF',
        dashArray: '',
        fillOpacity: 0.7
    });

    if(!L.Browser.ie || !L.Browser.opera || !L.Browser.edge) {
        layer.bringToFront();
    }

}
//resets highlight when mouse exits layer
function resetHighlight(event) {
    geojson.resetStyle(event.target);
}
function zoomToFeature(event) {
    map.fitBounds(event.target.getBounds());
}
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlight,
        mouseout: resetHighlight
    });
}
function onClick(event) {
    let maakunta = event.sourceTarget.feature.properties.Maakunta;
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("art1").innerHTML = xhttp.responseText;
            console.log(xhttp.responseText);
        }
    };
    //xhttp.open("GET", proxy+"http://localhost/haku.php?q="+maakunta, true);
    xhttp.open("GET", proxy+"http://users.metropolia.fi/~kenertml/haku.php?maakunta="+maakunta, true);
    http://users.metropolia.fi/~kenertml/
    xhttp.send();
    //console.log(fetch('${proxy}http://localhost/haku.php?q="+maakunta'))
}
/*function onClick(event) {
    let maakunta = event.sourceTarget.feature.properties.Maakunta;
    //window.location.href="haku.html";
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("art1").innerHTML = xhttp.responseText;
            console.log(xhttp.responseText);
        }
    };

    xhttp.open("GET", "http://localhost/haku.php?q="+maakunta, true);
    xhttp.send();
}*/
