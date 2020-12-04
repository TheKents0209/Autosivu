<?php
$servername = "mysql.metropolia.fi";
$username = "kenertml";
$password = "JennaKuha2002";
$db_name = "kenertml";
$table_name = "autot";

// Create connection
$conn = new mysqli($servername, $username, $password, $db_name);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$haku_maakunta = $_GET["maakunta"];

$sql = "SELECT * FROM $table_name WHERE maakunta = '$haku_maakunta' ORDER BY id DESC";
$result = mysqli_query($conn, $sql);
echo "<header>";
echo "<h2>Autot maakunnalta: " . $haku_maakunta . "</h2>";
echo "</header>";
echo "<div id=figures>";
while($row = mysqli_fetch_assoc($result)){
	$id = $row['id'];
	$maakunta = $row['maakunta'];
	$merkki = $row['merkki'];
	$malli = $row['malli'];
	$vari = $row['vari'];
	$kuva = $row['kuva'];
	echo "<figure>";
	echo "<img src=" . $kuva . ">";
	echo "<figcaption>";
	echo "<p>Merkki:" . $merkki . "<br><br>Malli:" . $malli . "<br><br>VÃ¤ri:" . $vari . "<br></p>";
	echo "</figcaption>";
	echo "</figure>";
}
echo "</div>";
?>