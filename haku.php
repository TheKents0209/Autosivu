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

$sql = "SELECT * FROM $table_name WHERE maakunta = '$haku_maakunta'";
$result = mysqli_query($conn, $sql);
echo "<header>";
echo "<h2>" . $haku_maakunta . "</h2>";
echo "<table>";
echo "<tr>";
while($row = mysqli_fetch_assoc($result)){
	$id = $row['id'];
	$maakunta = $row['maakunta'];
	$merkki = $row['merkki'];
	$malli = $row['malli'];
	$vari = $row['vari'];
	$kuva = $row['kuva'];

	echo "<th>ID</th>";
echo "<td>" . $id . "</td>";
echo "<th>Maakunta</th>";
echo "<td>" . $maakunta . "</td>";
echo "<th>merkki</th>";
echo "<td>" . $merkki . "</td>";
echo "<th>malli</th>";
echo "<td>" . $malli . "</td>";

}
?>