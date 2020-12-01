<?php

	
	
	$nimi = $_REQUEST['Nimet'];
	$tieto = $_REQUEST['Tiedot'];
	$aidinkieli = $_REQUEST['Aidinkieli'];
	$palaute = $_REQUEST['Palautteeni'];
	
	$Palautteeni = "Name: $nimi\nTieto: $tieto\Aidinkieli: $aidinkieli\nPalaute: $palaute";
	
	//mail( "hanna.kaimo@yahoo.com", "Olet saanut palautteen", "Information requested:\n\n$palaute", "From: $nimi");
	
	/*ini_set("SMTP","hanna.kaimo@yahoo.com");
	ini_set("smtp_port","25"); 
	
	ini_set( "hanna.kaimo@yahoo.com","Information requested:\n\n$Palautteeni");
	
	$headers = "From: shlomo@zend.com";
	
	mail( 'hanna.kaimo@yahoo.com', 'Olet saanut palautteen',$palaute, $headers);
	*/
	
	
	echo "Kiitos palautteesta!<BR>";



?>