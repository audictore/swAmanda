document.addEventListener("DOMContentLoaded", function() {
    // Función para manejar las sugerencias de autocompletado
    function showSuggestions(inputElement, type) {
        const value = inputElement.value.trim();

        // Verificar que el usuario haya ingresado al menos 2 caracteres antes de buscar
        if (value.length <= 1) {
            document.getElementById("suggestions").innerHTML = "";
            return;
        }

        // Crear el objeto XMLHttpRequest para comunicarse con el servidor
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost/pruebas/php/obtenerPaises.php?q=" + encodeURIComponent(value) + "&type=" + encodeURIComponent(type), true);
        xhr.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                // Actualizar el contenedor de sugerencias con la respuesta del servidor
                document.getElementById("suggestions").innerHTML = this.responseText;
            }
        };
        xhr.send();
    }

    // Asignar el manejador de eventos a los campos de entrada
    document.getElementById("contiInput").addEventListener("input", function() {
        showSuggestions(this, 'conti');
    });
    document.getElementById("countryInput").addEventListener("input", function() {
        showSuggestions(this, 'country');
    });
    document.getElementById("stateInput").addEventListener("input", function() {
        showSuggestions(this, 'state');
    });
});
