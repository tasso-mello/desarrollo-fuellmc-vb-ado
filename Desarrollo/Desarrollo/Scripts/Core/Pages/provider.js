var editObject = {};
var objectEditString = '';

$(document).ready(function () {
    loadProviderForm();
});

function loadProviderForm() {
    $("#contentCreateForm").append(createRowButton("add", "Añadir", "success", ""));
    document.getElementById("add").addEventListener("click", anadirProvider);
    getProviders();
    bindProviderTable(requestResult);
    resetRowsFromTable();
}

function anadirProvider() {
    resetEditBeforeEdit();
    createProviderForm("#formCreate");
    $("#formCreate").toggle(300);
}

function createProviderForm(idForm) {

    reloadButtom();

    clearForm(idForm);
    $(idForm).append(createFormInput("nombreProvedor", "Nombre", "text"));
    $(idForm).append(createFormInput("direccionprovedor", "Direccion", "text"));
    $(idForm).append(createFormInput("refprovedor", "Ref", "number"));
    $(idForm).append("</br>");
    $(idForm).append(createRowButton("btnGravar", "Añadir", "success", `onclick="saveProvider(false)"`));
}

function bindProviderTable(table) {
    $("#contentProvider").empty();
    $(table).each(function () {
        $("#contentProvider").append(createRow(this.Id, this.Nombre, this.Direccion, this.Ref));
    });
}

function createRow(id, nombre, direccion, ref) {
    return `<tr><th scope="row">${id}</th><td>${nombre}</td><td>${direccion}</td><td>${ref}</td><td style="width: 1%">${createSpaces(2)} ${getEditButton("Provider")} ${createSpaces(5)}${getDeleteButton("Provider")}</td></tr>`;
}

function getObjectFromForm() {
    return `id:0, nombre:'${$("#nombreProvedor").val()}', direccion:'${$("#direccionprovedor").val()}', ref:${$("#refprovedor").val()}`;
}

function getObjectFromTable(id, nombre, direccion, ref) {
    return `id:${id}, nombre:'${nombre}', direccion:'${direccion}', ref:${ref}`;
}

function saveProvider(isUpdate) {
    call("Provider.aspx/SaveProvider", `?isUpdate=${isUpdate.toString()}`, "POST", false, "application/json; charset=utf-8", `provider`, !isUpdate ? getObjectFromForm() : objectEditString);
    clearForm("#formCreate");
    $("#add").remove();
    loadProviderForm();
}

function removeProvider() {
    call("Provider.aspx/DeleteProvider", ``, "POST", false, "application/json; charset=utf-8", `provider`, objectEditString);
    clearForm("#formCreate");
    $("#add").remove();
    loadProviderForm();
}

function cancelRemoveProvider() {
    resetRowsFromTable();
} 

function editProvider(row) {
    if (row.parentElement.parentElement != null) {
        var arrayObject = row.parentElement.parentElement.children;
        resetEditBeforeEdit();

        updateEditObject(arrayObject[0].innerText, arrayObject[1].innerText, arrayObject[2].innerText, arrayObject[3].innerText);
        
        arrayObject[1].innerHTML = createInput(`${arrayObject[1].innerText}_edit`, ``, `text`, arrayObject[1].innerText);
        arrayObject[2].innerHTML = createInput(`${arrayObject[2].innerText}_edit`, ``, `text`, arrayObject[2].innerText);
        arrayObject[3].innerHTML = createInput(`${arrayObject[3].innerText}_edit`, ``, `number`, arrayObject[3].innerText);
        arrayObject[4].children[0].innerHTML = getCancelButton("Provider");
        arrayObject[4].children[1].innerHTML = getSaveButton("Provider");
    }
}

function cancelEditProvider(row) {
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

function saveEditProvider(row) {
    var arrayObject = row.parentElement.parentElement.parentElement.children;
    objectEditString = getObjectFromTable(arrayObject[0].innerText, arrayObject[1].children[0].value, arrayObject[2].children[0].value, arrayObject[3].children[0].value);
    saveProvider(true);
}

function deleteProvider(row) {
    if (row.isConnected) {
        resetRowsFromTable();
        var lineObject = row.parentElement.parentElement;

        $(lineObject).attr("rowselected", "rowselected");
        $("tr").not("[rowselected]").css("background-color", "darkgrey");
        $("tr").first().css("background-color", "#fff");
        $(lineObject).after(createConfirmRow("Provider"))
        var arrayObject = row.parentElement.parentElement.children;

        objectEditString = getObjectFromTable(arrayObject[0].innerText, arrayObject[1].innerText, arrayObject[2].innerText, arrayObject[3].innerText);
    }
}