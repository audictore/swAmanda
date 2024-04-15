$(document).ready(function(){
    //Mostrar continentes al cargar la página
    $.ajax({
        url: 'http://localhost/pruebas/php/getConti.php',
        type: 'GET',
        dataType: 'json',
        success: function(data){
            $.each(data, function(key, value){
                $('#selectConti').append($('<option>', {
                    value: value.idConti,
                    text: value.nombConti,
                }));
            });
        }
    });

    //Mostrar paises al seleccionar un continente
    $('#selectConti').change(function(){
        var idConti = $(this).val();
        
        //Limpiar el dropdown de paises para mostrar nuevos datos
        $('#countrySelect').empty().append('<option value="">Selecciona un país</option>');
        $('#stateSelect').empty().append('<option value="">Selecciona un estado</option>'); 

        //Realizar solicitud AJAX a getCountry.php
        $.ajax({
            url: 'http://localhost/pruebas/php/getCountry.php',
            type: 'GET',
            dataType: 'json',
            data: {idConti: idConti},
            success: function(paises) {
                //Iterar sobre el array de los paises y añadir cada uno al dropdown
                $.each(paises, function(index, pais){
                    $('#countrySelect').append($('<option>', {
                        value: pais.idPais,
                        text: pais.nombrePais
                    }));
                });
            },
            error: function(xhr, status, error){
                console.error("Error al obtener los paises: ", error);
            }
        });
    });

    //Mostrar los estados al seleccionar un país
    $('#countrySelect').change(function(){
        var idPais = $(this).val();
        
        //Limpiar el dropdown de estados para presentar nuevos datos
        $('#stateSelect').empty().append('<option value="">Selecciona un estado</option>');

        //Realzar solicitud AJAX a getStates.php
        $.ajax({
            url: 'http://localhost/pruebas/php/getStates.php',
            type: 'GET',
            dataType: 'json',
            data: {idPais: idPais},
            success: function(estados) {
                //Iterar sobre el array de los estados y añadir cada uno al dropdown
                $.each(estados, function(index, estado){
                    $('#stateSelect').append($('<option>', {
                        value: estado.idEstado,
                        text: estado.nombreEstado
                    }));
                });
            },
            error: function(xhr, status, error){
                console.error("Error al obtener los estados: ", error);
            }
        });
    });
});