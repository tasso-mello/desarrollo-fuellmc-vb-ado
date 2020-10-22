var editObject = {};
var objectEditString = '';

$(document).ready(function () {
    loadContactForm();
});

function loadContactForm() {
    $("#contentContactCreateForm").append(createRowButton("add", "Añadir", "success", ""));
    document.getElementById("add").addEventListener("click", anadirContact);
    getContacts();
    bindTContactable(requestResult);
    resetRowsFromTable();
}

function anadirContact() {
    resetEditBeforeEdit();
    createContactForm("#formContactCreate");
    $("#formContactCreate").toggle(300);
}

function createContactForm(idForm) {

    reloadButtom();
    getProviders();
    clearForm(idForm);
    $(idForm).append(createFormInput("nombreContact", "Nombre", "text"));
    $(idForm).append(createFormInput("departamentoContact", "Departamento", "text"));
    $(idForm).append(createFormInput("emailContact", "E-mail", "text"));
    $(idForm).append(createFormInput("telefonoContact", "Telefono", "number"));
    $(idForm).append(createObjectFormSelect("providerContact", "Proveedor", "", requestResult));
    $(idForm).append("</br>");
    $(idForm).append(createRowButton("btnGravar", "Añadir", "success", `onclick="saveContact(false)"`));
}

function bindTContactable(table) {
    $("#contentContact").empty();
    $(table).each(function () {
        $("#contentContact").append(createContactRow(this.Id, this.Nombre, this.Departamento, this.Email, this.Telefono, (`${this.Provider.Id} - ${this.Provider.Nombre}`)));
    });
}

function createContactRow(id, nombre, departamento, email, telefono, provider) {
    return `<tr><th scope="row">${id}</th>
            <td>${nombre}</td>
            <td>${departamento}</td>
            <td>${email}</td>
            <td>${telefono}</td>
            <td>${provider}</td>
            <td style="width: 1%">${createSpaces(5)} ${getDeleteButton("Contact")}</td></tr>`;
}

function getObjectFromForm() {
    return `id:0, 
            nombre:'${$("#nombreContact").val()}', 
            departamento:'${$("#departamentoContact").val()}', 
            email:'${$("#emailContact").val()}', 
            telefono:'${$("#telefonoContact").val()}', 
            providerId:${$("#providerContact").val()}`;
}

function getContactObjectFromTable(id, nombre, departamento, email, telefono, provider) {
    return `id:${id}, 
            nombre:'${nombre}',
            departamento:'${departamento}', 
            email:'${email}', 
            telefono:'${telefono}', 
            providerId:${(provider.split(' - ')[0])}`;
}

function saveContact(isUpdate) {
    call("Contact.aspx/SaveContact", `?isUpdate=${isUpdate.toString()}`, "POST", false, "application/json; charset=utf-8", `contact`, !isUpdate ? getObjectFromForm() : objectEditString);
    clearForm("#formContactCreate");
    $("#add").remove();
    loadContactForm();
}

function removeContact() {
    call("Contact.aspx/DeleteContact", ``, "POST", false, "application/json; charset=utf-8", `contact`, objectEditString);
    clearForm("#formContactCreate");
    $("#add").remove();
    loadContactForm();
}

function cancelRemoveContact() {
    resetRowsFromTable();
}

function editContact(row) {
    if (row.parentElement.parentElement != null) {
        var arrayObject = row.parentElement.parentElement.children;
        resetEditBeforeEdit();

        updateEditObject(arrayObject[0].innerText, arrayObject[1].innerText, arrayObject[2].innerText, arrayObject[3].innerText);

        arrayObject[1].innerHTML = createInput(`${arrayObject[1].innerText}_edit`, ``, `text`, arrayObject[1].innerText);
        arrayObject[2].innerHTML = createInput(`${arrayObject[2].innerText}_edit`, ``, `text`, arrayObject[2].innerText);
        arrayObject[3].innerHTML = createInput(`${arrayObject[3].innerText}_edit`, ``, `number`, arrayObject[3].innerText);
        arrayObject[4].children[0].innerHTML = getCancelButton("Contact");
        arrayObject[4].children[1].innerHTML = getSaveButton("Contact");
    }
}

function cancelEditContact(row) {
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

function saveEditContact(row) {
    var arrayObject = row.parentElement.parentElement.parentElement.children;
    objectEditString = getContactObjectFromTable(arrayObject[0].innerText, arrayObject[1].children[0].value, arrayObject[2].children[0].value, arrayObject[3].children[0].value);
    saveContact(true);
}

function deleteContact(row) {
    if (row.isConnected) {
        resetRowsFromTable();
        var lineObject = row.parentElement.parentElement;

        $(lineObject).attr("rowselected", "rowselected");
        $("tr").not("[rowselected]").css("background-color", "darkgrey");
        $("tr").first().css("background-color", "#fff");
        $(lineObject).after(createConfirmRow("Contact"))
        var arrayObject = row.parentElement.parentElement.children;

        objectEditString = getContactObjectFromTable(arrayObject[0].innerText, arrayObject[1].innerText, arrayObject[2].innerText, arrayObject[3].innerText, arrayObject[4].innerText, arrayObject[5].innerText);
    }
}