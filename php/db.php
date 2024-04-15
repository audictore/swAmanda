<?php
//bd
$servername = "127.0.0.1";
$username = "root";
$password = "Jajc_2020Pac";
$database = "dbPaises";

//Creación de la conexión
$conexion = new mysqli($servername, $username, $password, $database);

//Validación de la conexión
if ($conexion->connect_error){
    die("Conexión fallida: " . $conexion->connect_error);
}
?>