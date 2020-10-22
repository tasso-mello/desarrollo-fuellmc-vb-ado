<%@ Page Title="Volumes" Language="VB" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Volume.aspx.vb" Inherits="Desarrollo.Volume" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <div style="margin-top: 10%; margin-bottom: 10%;">
        <div class="row">
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Cliente</th>
                        <th scope="col">Volume Comprometido</th>
                        <th scope="col">Desde</th>
                        <th scope="col">Hasta</th>
                        <th scope="col" style0="width: 1%">Comportamiento</th>
                    </tr>
                </thead>
                <tbody id="contentVolume">

                </tbody>
            </table>
        </div>
        <div class="row" id="contentVolumeCreateForm">
        </div>
        <div class="row" style="margin-top:2%">
            <div id="formVolumeCreate" style="display: none;">
            </div>
        </div>
    </div>
    <script src="../../Scripts/Core/Pages/volume.js"></script>
</asp:Content>
