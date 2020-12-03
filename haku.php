<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "autot";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$maakunta = $_GET["maakunta"];
$sql = "SELECT merkki, vari, kuva FROM hienoauto
WHERE maakunta = '" . $_POST["maakunta"] . " ' OR vari = '" . $_POST["vari"] ."' OR merkki = '" . $_POST["merkki"] ."'OR malli = '" . $_POST["malli"] ."'";
WHERE maakunta = "$maakunta '";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
   echo "merkki: " . $row["merkki"]. " - vari: " . $row["vari"]."<br>";
   echo "<img src='/Kuvat/{$row["kuva"]}' >";


  }
} else {
  echo "0 results";
   // $img_src = $rows['kuva'];
}


$conn->close();
?>
