var editObject = {};
var objectEditString = '';

$(document).ready(function () {
    loadClientForm();
});

function loadClientForm() {
    getClients();
    $("#clientContentCreateForm").append(createRowButton("add", "Añadir", "success", ""));
    document.getElementById("add").addEventListener("click", anadirClient);
    bindClientTable(requestResult);
    resetRowsFromTable();
}

function anadirClient() {
    resetEditBeforeEdit();
    createClientForm("#clientFormCreate");
    $("#clientFormCreate").toggle(300);
}

function createClientForm(idForm) {

    reloadButtom();
    getProviders();
    clearForm(idForm);
    $(idForm).append(createFormInput("nombreCliente", "Nombre", "text"));
    $(idForm).append(createFormInput("diasPagoCliente", "Dias de Pago", "number"));
    $(idForm).append(createFormSelect("temperaturaCliente", "Temperatura", "", new Array("S", "N")));
    $(idForm).append(createFormSelect("fleteCliente", "Flete", "", new Array("S", "N")));
    $(idForm).append(createFormSelect("tipoCliente", "Tipo", "", new Array("Referenciado", "Spot")));
    $(idForm).append(createFormInput("porcentajeCliente", "Porcentaje", "number"));
    $(idForm).append(createFormInput("absolutoCliente", "Absoluto", "text"));
    $(idForm).append(createObjectFormSelect("providerCliente", "Proveedor", "", requestResult));
    $(idForm).append("</br>");
    $(idForm).append(createRowButton("btnGravar", "Añadir", "success", `onclick="saveClient(false)"`));
}

function bindClientTable(table) {
    $("#contentClient").empty();
    $(table).each(function () {
        $("#contentClient").append(createClientRow(this.Id, this.Nombre, this.DiasPago, this.Temperatura, this.Flete, this.Tipo, this.Porcentaje, this.Absoluto, (`${this.ProviderId} - ${this.Provider.Nombre}`)));
    });
}

function createClientRow(id, nombre, diasPago, temperatura, flete, tipo, porcentaje, absoluto, providerNombre) {
    return `<tr>
                <th scope="row">${id}</th>
                <td>${nombre}</td>
                <td>${diasPago}</td>
                <td>${(temperatura == false ? "S" : "N" )}</td>
                <td>${(flete == false ? "S" : "N")}</td>
                <td>${(tipo == 0 ? "Referenciado" : "Spot")}</td>
                <td>${porcentaje}</td>
                <td>${absoluto}</td>
                <td>${providerNombre}</td>
                <td style="width: 1%">${createSpaces(5)}${getDeleteButton("Client")}</td>
            </tr>`;
}

function getObjectFromForm() {
    return `id:0, 
            nombre:'${$("#nombreCliente").val()}', 
            diasPago:${$("#diasPagoCliente").val()}, 
            temparatura:${$("#temperaturaCliente").val()},
            flete:${$("#fleteCliente").val()},
            tipo:${$("#tipoCliente").val()},
            porcentaje:${$("#porcentajeCliente").val()},
            absoluto:'${$("#absolutoCliente").val()}',
            providerId:${$("#providerCliente").val()}`;
}

function getClientObjectFromTable(id, nombre, diasPago, temperatura, flete, tipo, porcentaje, absoluto, providerNombre) {
    return `id:${id},
            nombre:'${nombre}', 
            diasPago:${diasPago}, 
            temparatura:${(temperatura == "S" ? 0 : 1)},
            flete:${(flete == "S" ? 0 : 1)},
            tipo:${(tipo == "Referenciado" ? 0 : 1)},
            porcentaje:${porcentaje},
            absoluto:'${absoluto}',
            providerId:${(providerNombre.split(' - ')[0])}`;
}

function saveClient(isUpdate) {
    call("Client.aspx/SaveClient", `?isUpdate=${isUpdate.toString()}`, "POST", false, "application/json; charset=utf-8", `client`, !isUpdate ? getObjectFromForm() : objectEditString);
    clearForm("#clientFormCreate");
    $("#add").remove();
    loadClientForm();
}

function removeClient() {
    call("Client.aspx/DeleteClient", ``, "POST", false, "application/json; charset=utf-8", `client`, objectEditString);
    clearForm("#clientFormCreate");
    $("#add").remove();
    loadClientForm();
}

function cancelRemoveClient() {
    resetRowsFromTable();
}

function editClient(row) {
    if (row.parentElement.parentElement != null) {
        var arrayObject = row.parentElement.parentElement.children;
        resetEditBeforeEdit();

        updateEditObject(arrayObject[0].innerText, arrayObject[1].innerText, arrayObject[2].innerText, arrayObject[3].innerText);

        arrayObject[1].innerHTML = createInput(`${arrayObject[1].innerText}_edit`, ``, `text`, arrayObject[1].innerText);
        arrayObject[2].innerHTML = createInput(`${arrayObject[2].innerText}_edit`, ``, `text`, arrayObject[2].innerText);
        arrayObject[3].innerHTML = createInput(`${arrayObject[3].innerText}_edit`, ``, `number`, arrayObject[3].innerText);
        arrayObject[4].children[0].innerHTML = getCancelButton("Client");
        arrayObject[4].children[1].innerHTML = getSaveButton("Client");
    }
}

function cancelEditClient(row) {
    var arrayObject = row.parentElement.parentElement.parentElement;

    arrayObject.innerHTML = createRow(editObject.id, editObject.nombre, editObject.direccion, editObject.ref);
}

function updateEditObject(id, nombre, direccion, ref) {
    editObject = {
        id: id,
        nombre: nombre,
        direccion: direccion,
        ref: ref
    };
}

function saveEditClient(row) {
    var arrayObject = row.parentElement.parentElement.parentElement.children;
    objectEditString = getClientObjectFromTable(arrayObject[0].innerText, arrayObject[1].innerText, arrayObject[2].innerText, arrayObject[3].innerText, arrayObject[4].innerText, arrayObject[5].innerText, arrayObject[6].innerText, arrayObject[7].innerText, arrayObject[8].innerText);
    saveClient(true);
}

function deleteClient(row) {
    if (row.isConnected) {
        resetRowsFromTable();
        var lineObject = row.parentElement.parentElement;

        $(lineObject).attr("rowselected", "rowselected");
        $("tr").not("[rowselected]").css("background-color", "darkgrey");
        $("tr").first().css("background-color", "#fff");
        $(lineObject).after(createConfirmRow("Client"))
        var arrayObject = row.parentElement.parentElement.children;

        objectEditString = getClientObjectFromTable(arrayObject[0].innerText, arrayObject[1].innerText, arrayObject[2].innerText, arrayObject[3].innerText, arrayObject[4].innerText, arrayObject[5].innerText, arrayObject[6].innerText, arrayObject[7].innerText, arrayObject[8].innerText);
    }
}