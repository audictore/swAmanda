<?php
header('Content-Type: application/json');

// Conexión establecida en db.php
require 'db.php';

$idConti = filter_input(INPUT_GET, 'idConti', FILTER_VALIDATE_INT);
$term = $_GET['term'] ?? '';

if (false === $idConti || null === $idConti) {
    echo json_encode(['error' => 'Id del continente no válido']);
    exit;
}

$stmt = $conexion->prepare("SELECT idPais, nombrePais FROM paises WHERE idConti = ? AND nombrePais LIKE CONCAT(?, '%') AND estatusPais = 1 ORDER BY nombrePais ASC");
if (false === $stmt) {
    error_log('Error en prepare: ' . $conexion->error);
    echo json_encode(['error' => 'Error al preparar la consulta']);
    exit;
}

if (!$stmt->bind_param("is", $idConti, $term)) {
    error_log('Error en bind_param: ' . $stmt->error);
    echo json_encode(['error' => 'Error al vincular los parámetros']);
    exit;
}

if (!$stmt->execute()) {
    error_log('Error en execute: ' . $stmt->error);
    echo json_encode(['error' => 'Error al ejecutar la consulta']);
    exit;
}

$result = $stmt->get_result();
$paises = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $paises[] = $row;
    }
}

echo json_encode($paises);

$stmt->close();
$conexion->close();
?>
