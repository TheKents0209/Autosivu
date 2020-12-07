const proxy = 'https://cors-anywhere.herokuapp.com/';

//Funtion that runs when haku.html forms submit button is clicked
function fillInfo(form) {
    //Gets form values and assigns them to variables
    let maakunta_haku = form.maakunta.value;
    console.log(maakunta_haku);
    let merkki_haku = form.merkki.value;
    let malli_haku = form.malli.value;
    let vari_haku = form.vari.value;
    const haku_art = document.getElementById("haku_art");
    haku_art.innerHTML = `<h4>
            Etsitään autoja, Odota hetki...
         </h4>`;
    const tarkka_haku_tulos = document.createElement("article");
    tarkka_haku_tulos.setAttribute("id", "tarkka_haku_tulos");
    const xhttp2 = new XMLHttpRequest();
    xhttp2.onreadystatechange = function() {
        // If everything is alright on connection, executes
        if (this.readyState == 4 && this.status == 200) {
            haku_art.innerHTML = xhttp2.responseText;
            console.log(xhttp2.responseText);
        }
    };
    //Performs php search
    xhttp2.open("GET", proxy+"https://users.metropolia.fi/~kenertml/tarkempi_haku.php?maakunta="+maakunta_haku+"&merkki="+merkki_haku+"&malli="+malli_haku+"&vari="+vari_haku, true);
    xhttp2.send();
}