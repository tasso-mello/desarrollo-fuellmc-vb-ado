<%@ Page Title="Proveedores" Language="VB" MasterPageFile="~/Site.Master" AutoEventWireup="false" CodeBehind="Provider.aspx.vb" Inherits="Desarrollo.Provider" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <div style="margin-top: 10%; margin-bottom: 10%;">
        <div class="row">
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Direccion</th>
                        <th scope="col">Ref</th>
                        <th scope="col" style="width: 1%">Comportamiento</th>
                    </tr>
                </thead>
                <tbody id="contentProvider">

                </tbody>
            </table>
        </div>
        <div class="row" id="contentCreateForm">
        </div>
        <div class="row" style="margin-top:2%">
            <div id="formCreate" style="display: none;">
            </div>
        </div>
    </div>
    <script src="../../Scripts/Core/Pages/provider.js"></script>
</asp:Content>
