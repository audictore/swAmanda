$(document).ready(function() {
    let selectedIdConti = null; // Variable que Guardará el Id del continente seleccionado
    let selectedIdCountry = null; // Variable que Guardará el Id del país seleccionado

    // Autocompletado para continentes
    $("#continentInput").autocomplete({
        source: function(request, response) {
            $.getJSON('http://localhost/pruebas/php/getConti.php', {
                term: request.term
            }, function(data) {
                response($.map(data, function(item) {
                    return {
                        label: item.nombConti,
                        value: item.idConti
                    };
                }));
            });
        },
        select: function(event, ui) {
            event.preventDefault();
            $("#continentInput").val(ui.item.label);
            selectedIdConti = ui.item.value; // Guarda el Id del continente seleccionado
            $("#countryInput").val('').prop("disabled", false).focus();
            $("#stateInput").val('').prop("disabled", true); // Limpia y deshabilita el campo de estado
        },
        focus: function(event, ui) {
            event.preventDefault();
            $("#continentInput").val(ui.item.label);
        }
    }).on("change", function() {
        if (!this.value) {
            $("#countryInput").val('').prop("disabled", true);
            $("#stateInput").val('').prop("disabled", true);
        }
    });

    // Autocompletado para países
    $("#countryInput").autocomplete({
        source: function(request, response) {
            $.getJSON('http://localhost/pruebas/php/getCountry.php', {
                idConti: selectedIdConti,
                term: request.term
            }, function(data) {
                response($.map(data, function(item) {
                    return {
                        label: item.nombrePais,
                        value: item.idPais
                    };
                }));
            });
        },
        select: function(event, ui) {
            event.preventDefault();
            $("#countryInput").val(ui.item.label);
            selectedIdCountry = ui.item.value; // Guarda el Id del país seleccionado
            $("#stateInput").val('').prop("disabled", false).focus();
        },
        focus: function(event, ui) {
            event.preventDefault();
            $("#countryInput").val(ui.item.label);
        }
    }).on("change", function() {
        if (!this.value) {
            $("#stateInput").val('').prop("disabled", true);
        }
    });

    // Autocompletado para estados
    $("#stateInput").autocomplete({
        source: function(request, response) {
            $.getJSON('http://localhost/pruebas/php/getStates.php', {
                idPais: selectedIdCountry,
                term: request.term
            }, function(data) {
                response($.map(data, function(item) {
                    return {
                        label: item.nombreEstado,
                        value: item.idEstado
                    };
                }));
            });
        },
        select: function(event, ui) {
            event.preventDefault();
            $("#stateInput").val(ui.item.label);
        },
        focus: function(event, ui) {
            event.preventDefault();
            $("#stateInput").val(ui.item.label);
        }
    });
});
