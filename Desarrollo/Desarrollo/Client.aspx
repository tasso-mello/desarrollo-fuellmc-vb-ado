<%@ Page Title="Clientes" Language="VB" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Client.aspx.vb" Inherits="Desarrollo.Client" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <div style="margin-top: 10%; margin-bottom: 10%;">
        <div class="row">
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Dias de Pago</th>
                        <th scope="col">Temperatura</th>
                        <th scope="col">Flete</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Porcentage</th>
                        <th scope="col">Absoluto</th>
                        <th scope="col">Provider</th>
                        <th scope="col" style="width: 1%">Comportamiento</th>
                    </tr>
                </thead>
                <tbody id="contentClient">

                </tbody>
            </table>
        </div>
        <div class="row" id="clientContentCreateForm">
        </div>
        <div class="row" style="margin-top:2%">
            <div id="clientFormCreate" style="display: none;">
            </div>
        </div>
    </div>
    <script src="../../Scripts/Core/Pages/client.js"></script>
</asp:Content>
