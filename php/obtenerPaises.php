<?php
// Conexión a la base de datos
$serverName = "127.0.0.1";
$userName = "root";
$password = "Jajc_2020Pac";
$dataBase = "dbPaises";

$conn = new mysqli($serverName, $userName, $password, $dataBase);

// Asegurarse de que la conexión sea segura
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Configurar la codificación de caracteres para evitar problemas de caracteres especiales
$conn->set_charset("utf8mb4");

// Obtener los parámetros de entrada directamente, considerando la validación más adelante
$searchTerm = $_GET['q'] ?? '';
$type = $_GET['type'] ?? '';

// Validar el tipo de búsqueda
$allowedTypes = ['conti', 'country', 'state'];
if (!in_array($type, $allowedTypes)) {
    die("Tipo de búsqueda no válido.");
}

// Asignar tabla y columna según el tipo de búsqueda
$table = $column = '';
switch ($type) {
    case 'conti':
        $table = "continente";
        $column = "nombConti";
        break;
    case 'country':
        $table = "paises";
        $column = "nombrePais";
        break;
    case 'state':
        $table = "estados";
        $column = "nombreEstado";
        break;
}

// Preparar la consulta para evitar la inyección de SQL
$searchTerm = "%".$searchTerm."%";
$query = "SELECT * FROM $table WHERE $column LIKE ?";
$stmt = $conn->prepare($query);
if ($stmt === false) {
    die("Error en la preparación de la consulta: " . $conn->error);
}

// Ejecutar la consulta
$stmt->bind_param("s", $searchTerm);
$stmt->execute();

// Obtener los resultados
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Salida de datos de cada fila
    while($row = $result->fetch_assoc()) {
        echo "<p>" . htmlspecialchars($row[$column], ENT_QUOTES, 'UTF-8') . "</p>";
    }
} else {
    echo "0 resultados";
}

// Cerrar la conexión
$stmt->close();
$conn->close();
?>