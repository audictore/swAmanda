<?php
header('Content-Type: application/json');

// Conexión a la base de datos
$serverName = "127.0.0.1";
$userName = "root";
$password = "Jajc_2020Pac";
$dataBase = "dbPaises";

$conexion = new mysqli($serverName, $userName, $password, $dataBase);

if($conexion->connect_error) {
    error_log("Error de conexión a la base de datos: " . $conexion->connect_error);
    echo json_encode(['error' => 'Error en la conexión a la base de datos']);
    exit;
}

$sql = "SELECT idConti, nombConti FROM continente WHERE estatusConti = 1 ORDER BY nombConti ASC";
$result = $conexion->query($sql);

$conti = [];

if ($result->num_rows > 0){
    while ($row = $result->fetch_assoc()){
        $conti[] = $row;
    }
    echo json_encode($conti);
}else {
    echo json_encode([]);
}

$conexion->close();

/*
//Verificación de la conexión
if($conexion->connect_error){
    die("Error en la conexión: " . $conexion->connect_error);
}

//Consulta para obtener continentes
$sql = "SELECT idConti, nombConti FROM continente WHERE estatusConti = 1 ORDER BY nombConti ASC";
$resultado = $conexion->query($sql);

$conti = [];

if($resultado->num_rows > 0){
    while($row = $resultado->fetch_assoc()){
        $conti[] = $row;
    }
    echo json_encode($conti);
}else{
    echo json_encode([]);
}

$conexion->close();*/
?>
