<?php
header('Content-Type: application/json');

require 'db.php';

$idPais = filter_input(INPUT_GET, 'idPais', FILTER_VALIDATE_INT);
$term = $_GET['term'] ?? '';

if (false === $idPais || null === $idPais) {
    echo json_encode(['error' => 'Id del país no válido']);
    exit;
}

$stmt = $conexion->prepare("SELECT idEstado, nombreEstado FROM estados WHERE idPais = ? AND nombreEstado LIKE CONCAT(?, '%') AND estatusEstado = 1 ORDER BY nombreEstado ASC");
if (false === $stmt) {
    error_log('Error en prepare: ' . $conexion->error);
    echo json_encode(['error' => 'Error al preparar la consulta']);
    exit;
}

if (!$stmt->bind_param("is", $idPais, $term)) {
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
$estados = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $estados[] = $row;
    }
}

echo json_encode($estados);

$stmt->close();
$conexion->close();
?>
