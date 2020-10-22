<%@ Page Title="Contactos" Language="VB" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Contact.aspx.vb" Inherits="Desarrollo.Contact" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <div style="margin-top: 10%; margin-bottom: 10%;">
        <div class="row">
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Departamento</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Telefono</th>
                        <th scope="col">Proveedor</th>
                        <th scope="col" style="width: 1%">Comportamiento</th>
                    </tr>
                </thead>
                <tbody id="contentContact">

                </tbody>
            </table>
        </div>
        <div class="row" id="contentContactCreateForm">
        </div>
        <div class="row" style="margin-top:2%">
            <div id="formContactCreate" style="display: none;">
            </div>
        </div>
    </div>
    <script src="../../Scripts/Core/Pages/contact.js"></script>
</asp:Content>
