var editObject = {};
var objectEditString = '';

$(document).ready(function () {
    loadVolumeForm();
});

function loadVolumeForm() {
    $("#contentVolumeCreateForm").append(createRowButton("add", "Añadir", "success", ""));
    document.getElementById("add").addEventListener("click", anadirVolume);
    getVolumes();
    bindTVolumeable(requestResult);
    resetRowsFromTable();
}

function anadirVolume() {
    resetEditBeforeEdit();
    createVolumeForm("#formVolumeCreate");
    $("#formVolumeCreate").toggle(300);
}

function createVolumeForm(idForm) {

    reloadButtom();
    getClients();
    clearForm(idForm);
    $(idForm).append(createObjectFormSelect("volumeCliente", "Cliente", "", requestResult));
    $(idForm).append(createFormInput("volumeComprometidoVolume", "Volume Comprometido", "number"));
    $(idForm).append(createFormInput("desdeVolume", "Desde", "date"));
    $(idForm).append(createFormInput("hastaVolume", "Hasta", "date"));
    $(idForm).append("</br>");
    $(idForm).append(createRowButton("btnGravar", "Añadir", "success", `onclick="saveVolume(false)"`));
}

function bindTVolumeable(table) {
    $("#contentVolume").empty();
    $(table).each(function () {
        $("#contentVolume").append(createVolumeRow(this.Id, (`${this.Cliente.Id} - ${this.Cliente.Nombre}`), this.VolumeComprometido, this.DesdeFormated, this.HastaFormated, ));
    });
}

function createVolumeRow(id, client, volumeComprometido, desde, hasta) {
    return `<tr><th scope="row">${id}</th>
            <td>${client}</td>
            <td>${volumeComprometido}</td>
            <td>${desde}</td>
            <td>${hasta}</td>
            <td style="width: 1%">${createSpaces(5)} ${getDeleteButton("Volume")}</td></tr>`;
}

function getObjectFromForm() {
    return `id:0, 
            clientId:'${$("#volumeCliente").val()}', 
            volumeComprometido:'${$("#volumeComprometidoVolume").val()}', 
            desde:'${$("#desdeVolume").val()}', 
            hasta:'${$("#hastaVolume").val()}'`;
}

function getVolumeObjectFromTable(id, client, volumeComprometido, desde, hasta) {
    return `id:${id}, 
            client:'${(client.split(' - ')[0])}',
            volumeComprometido:'${volumeComprometido}', 
            desde:'${desde}', 
            hasta:'${hasta}'`;
}

function saveVolume(isUpdate) {
    call("Volume.aspx/SaveVolume", `?isUpdate=${isUpdate.toString()}`, "POST", false, "application/json; charset=utf-8", `volume`, !isUpdate ? getObjectFromForm() : objectEditString);
    clearForm("#formVolumeCreate");
    $("#add").remove();
    loadVolumeForm();
}

function removeVolume() {
    call("Volume.aspx/DeleteVolume", ``, "POST", false, "application/json; charset=utf-8", `volume`, objectEditString);
    clearForm("#formVolumeCreate");
    $("#add").remove();
    loadVolumeForm();
}

function cancelRemoveVolume() {
    resetRowsFromTable();
}

function editVolume(row) {
    if (row.parentElement.parentElement != null) {
        var arrayObject = row.parentElement.parentElement.children;
        resetEditBeforeEdit();

        updateEditObject(arrayObject[0].innerText, arrayObject[1].innerText, arrayObject[2].innerText, arrayObject[3].innerText);

        arrayObject[1].innerHTML = createInput(`${arrayObject[1].innerText}_edit`, ``, `text`, arrayObject[1].innerText);
        arrayObject[2].innerHTML = createInput(`${arrayObject[2].innerText}_edit`, ``, `text`, arrayObject[2].innerText);
        arrayObject[3].innerHTML = createInput(`${arrayObject[3].innerText}_edit`, ``, `number`, arrayObject[3].innerText);
        arrayObject[4].children[0].innerHTML = getCancelButton("Volume");
        arrayObject[4].children[1].innerHTML = getSaveButton("Volume");
    }
}

function cancelEditVolume(row) {
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

function saveEditVolume(row) {
    var arrayObject = row.parentElement.parentElement.parentElement.children;
    objectEditString = getVolumeObjectFromTable(arrayObject[0].innerText, arrayObject[1].children[0].value, arrayObject[2].children[0].value, arrayObject[4].innerText);
    saveVolume(true);
}

function deleteVolume(row) {
    if (row.isConnected) {
        resetRowsFromTable();
        var lineObject = row.parentElement.parentElement;

        $(lineObject).attr("rowselected", "rowselected");
        $("tr").not("[rowselected]").css("background-color", "darkgrey");
        $("tr").first().css("background-color", "#fff");
        $(lineObject).after(createConfirmRow("Volume"))
        var arrayObject = row.parentElement.parentElement.children;

        objectEditString = getVolumeObjectFromTable(arrayObject[0].innerText, arrayObject[1].innerText, arrayObject[2].innerText, arrayObject[3].innerText, arrayObject[4].innerText);
    }
}