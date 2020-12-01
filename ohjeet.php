<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link href="CSS/style.css" rel="stylesheet" type="text/css"/>
</head>
<body>
    <p>tässä ohjeet</p>

<?php

function getAddress() {
    $protocol = $_SERVER['HTTPS'] == 'on' ? 'https' : 'http';
    return $protocol.'://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
}

echo getAddress();

?>

<?php
    echo "Hello World!";
?>
</body>
</html>