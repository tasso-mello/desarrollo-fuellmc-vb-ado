var providerId = ''
var clientId = ''
$(document).ready(function () {
    loadVolumeForm();
});

function loadVolumeForm() {
    getProviders()
    $("#formReportSelect").append(`<div class="row" style="display:flex">${createObjectSelect("providerReport", "Proveedor", "", requestResult)}${createSpaces(2)}${createButton("find", "Procurar", "success", "")}</div>`);
    document.getElementById("find").addEventListener("click", findReportByProvider);
}

function findReportByProvider() {
    providerId = '';
    clientId = '';

    if ($("#formReportCreate:visible").length > 0)
        $("#formReportCreate").toggle(200);

    loadReportValues();

    $("#formReportCreate").toggle(800);
}

function loadReportValues() {
    providerId = $("#providerReport").val();
    if (providerId != '' && providerId != undefined && providerId != null) {

        getProviderById(providerId);
        bindReportProviders();

        getClientByProviderId(providerId);
        bindReportClientProviders();

        getContactByProviderId(providerId);
        bindReportContactProvider();
    }

    if (clientId != '') {
        getVolumeByClientId(clientId);
        bindReportVolumeClient();
    }
}

function bindReportProviders() {
    $("#nombreValor").text(requestResult.Nombre);
    $("#direccionValor").text(requestResult.Direccion);
    $("#proveedorValor").text(requestResult.Ref);
}

function bindReportClientProviders() {
    if (requestResult != null) {
        clientId = requestResult.Id;
        $("#diasDePagoValor").text(requestResult.DiasPago);
        $("#temperaturaValor").text(requestResult.Temperatura);
        $("#fleteValor").text(requestResult.Flete);
        $("#tipoValor").text(requestResult.Tipo);
        $("#porcentajeValor").text(requestResult.Porcentaje);
        $("#absolutoValor").text(requestResult.Absoluto);
    }
}

function bindReportContactProvider() {
    bindContactProviderTable(requestResult);
}

function bindReportVolumeClient() {
    bindVolumeClientTable(requestResult);
}

function bindContactProviderTable(table) {
    $("#contentReportContact").empty();
    $(table).each(function () {
        $("#contentReportContact").append(createContactProviderRow(this.Nombre, this.Departamento, this.Email, this.Telefono));
    });
}

function createContactProviderRow(id, nombre, direccion, ref) {
    return `<tr><th scope="row">${id}</th><td>${nombre}</td><td>${direccion}</td><td>${ref}</td></tr>`;
}

function bindVolumeClientTable(table) {
    $("#contentReportVolume").empty();
    $(table).each(function () {
        $("#contentReportVolume").append(createVolumeClientrRow(this.Cliente.Nombre, this.VolumeComprometido, this.DesdeFormated, this.HastaFormated));
    });
}

function createVolumeClientrRow(id, nombre, direccion, ref) {
    return `<tr><th scope="row">${id}</th><td>${nombre}</td><td>${direccion}</td><td>${ref}</td></tr>`;
}