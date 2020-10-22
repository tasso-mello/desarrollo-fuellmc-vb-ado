function getProviders() {
    call("Provider.aspx/GetProviders", "", "GET", false, "application/json; charset=utf-8");
}

function getProviderById(id) {
    call("Provider.aspx/GetProviderById", `?id=${id}`, "GET", false, "application/json; charset=utf-8");
}

function getClientByProviderId(providerId) {
    call("Client.aspx/GetClientByProviderId", `?id=${providerId}`, "GET", false, "application/json; charset=utf-8");
}

function getContactByProviderId(providerId) {
    call("Contact.aspx/GetContactByProviderId", `?id=${providerId}`, "GET", false, "application/json; charset=utf-8");
}

function getVolumeByClientId(clientId) {
    call("Volume.aspx/GetVolumeByClientId", `?id=${clientId}`, "GET", false, "application/json; charset=utf-8");
}

function getClients() {
    call("Client.aspx/GetClients", "", "GET", false, "application/json; charset=utf-8");
}

function getContacts() {
    call("Contact.aspx/GetContacts", "", "GET", false, "application/json; charset=utf-8");
}

function getVolumes() {
    call("Volume.aspx/GetVolumes", "", "GET", false, "application/json; charset=utf-8");
}

function reloadButtom() {
    if ($("#add.btn-success").length > 0)
        changeButton("#add", "Cancelar", "btn-success", "btn-danger");
    else
        changeButton("#add", "Añadir", "btn-danger", "btn-success");
}

function createFormInput(name, label, type, value = '') {
    return `<div class="row">
                ${label != '' ? createLabel(label) : ''}
                ${createInput(name, label, type)}
            </div>`;
}

function createObjectFormSelect(name, label, type, value) {
    return `<div class="row">
                ${label != '' ? createLabel(label) : ''}
                ${createObjectSelect(name, label, type, value)}
            </div>`;
}

function createFormSelect(name, label, type, value) {
    return `<div class="row">
                ${label != '' ? createLabel(label) : ''}
                ${createSelect(name, label, type, value)}
            </div>`;
}

function createInput(name, label, type, value = '') {

    var edit = value != '' ? 'editing' : ''

    return `<input id="${name}" type="${type}" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" value="${value}" ${edit}>`;
}

function createSelect(name, label, type, value) {
    var edit = value != '' ? 'editing' : '';
    var option = '';

    $(value).each(function (i, value) {
        option += `<option value="${i}">${this}</option>`
    });

    return `<select class="form-control" id="${name}">${option}</select>`;
}

function createObjectSelect(name, label, type, value) {
    var edit = value != '' ? 'editing' : '';
    var option = '';

    $(value).each(function () {
        option += `<option value="${this.Id}">${this.Nombre}</option>`
    });

    return `<select class="form-control" id="${name}">${option}</select>`;
}

function createLabel(label) {
    return `<div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-sm">${label}</span>
            </div>`;
}

function createButton(name, label, type, event) {
    return `<button id="${name}" type="button" class="btn btn-${type}" ${event}>${label}</button>`;
}

function createRowButton(name, label, type, event) {
    return `<div class="row">
                ${createButton(name, label, type, event)}
            </div>`;
}

function createConfirmRow(model) {
    $("[confirm]").remove();

    return `<div confirm class="row" style="text-align:center;"><span><b>¿Quieres eliminar el registro?</b></span>${createSpaces(1)}${createButton("confirmRemove", "Sí", "success", `onclick="remove${model}()"`)}${createSpaces(1)} ${createButton("confirmRemove", "No", "danger", `onclick="cancelRemove${model}()"`)}</div>`;
}

function changeButton(name, label, oldType, newType) {
    $(name).text(label);
    $(name).removeClass(oldType);
    $(name).addClass(newType);
}

function clearForm(idForm) {
    $(idForm).children().remove();
}

function getEditButton(model) {
    return `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pen-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg" onmousedown="edit${model}(this)" style="cursor:pointer;">
                <path fill-rule="evenodd" d="M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
            </svg>`;
}

function getDeleteButton(model) {
    return `<svg  width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg" onmousedown="delete${model}(this)" style="cursor:pointer;">
                <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
            </svg>`;
}

function getCancelButton(model) {
    return `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg" onmousedown="cancelEdit${model}(this)" style="cursor:pointer;">
                <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
            </svg>`;
}

function getSaveButton(model) {
    return `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check-all" fill="currentColor" xmlns="http://www.w3.org/2000/svg" onmousedown="saveEdit${model}(this)" style="cursor:pointer;">
                <path fill-rule="evenodd" d="M8.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14l.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z"/>
            </svg>`;
}

function createSpaces(qtd) {
    var spaces = ``;
    for (var i = 0; i <= qtd; i++) {
        spaces += ` &nbsp;`;
    }
    return spaces;
}

function resetEditBeforeEdit() {
    if ($("input[editing]:visible").length > 0) {
        $("input[editing]:visible")[0].outerHTML = editObject.nombre;
        $("input[editing]:visible")[0].outerHTML = editObject.direccion;
        $("input[editing]:visible")[0].outerHTML = editObject.ref;

        $('.bi-x-circle-fill:visible')[0].outerHTML = getEditButton();
        $('.bi-check-all:visible')[0].outerHTML = getDeleteButton();
    }
}

function resetRowsFromTable() {
    $("tr").removeAttr("rowselected");
    $("tr").css("background-color", "#fff");
    $("[confirm]").remove();
}