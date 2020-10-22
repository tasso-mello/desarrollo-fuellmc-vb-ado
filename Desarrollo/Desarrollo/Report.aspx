<%@ Page Title="Reporte" Language="VB" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Report.aspx.vb" Inherits="Desarrollo.Report" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <div style="margin-top: 10%; margin-bottom: 10%;">
        <div class="row" id="formReportSelect" style="display: block;">
        </div>
        <br />
        <br />
        <div class="row">
            <div id="formReportCreate" style="display: none;">
                <table style="width: 100%">
                    <tr>
                        <td>
                            <table style="width: 100%">
                                <tr>
                                    <td style="width: 50%">
                                        <table style="width: 100%">
                                            <tr>
                                                <td style="width: 30%"><strong>Nombre</strong></td>
                                                <td style="width: 70%">
                                                    <label style="font-weight: normal" id="nombreValor"></label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="width: 30%"><strong>Direccion</strong></td>
                                                <td style="width: 70%">
                                                    <label style="font-weight: normal" id="direccionValor"></label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="width: 30%"><strong>Ref Proveedor</strong></td>
                                                <td style="width: 70%">
                                                    <label style="font-weight: normal" id="proveedorValor"></label>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td style="width: 50%">
                                        <table style="width: 100%">
                                            <tr>
                                                <td style="width: 50%">
                                                    <table style="width: 100%">
                                                        <tr>
                                                            <td style="width: 70%"><strong>Dias de pago</strong></td>
                                                            <td style="width: 30%">
                                                                <label style="font-weight: normal" id="diasDePagoValor"></label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="width: 70%"><strong>Temperatura</strong> </td>
                                                            <td style="width: 30%">
                                                                <label style="font-weight: normal" id="temperaturaValor"></label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="width: 70%"><strong>Flete</strong></td>
                                                            <td style="width: 30%">
                                                                <label style="font-weight: normal" id="fleteValor"></label>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td style="width: 50%">
                                                    <table style="width: 100%">
                                                        <tr>
                                                            <td style="width: 50%"><strong>Tipo</strong></td>
                                                            <td style="width: 50%">
                                                                <label style="font-weight: normal" id="tipoValor"></label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="width: 50%"><strong>Porcentaje</strong></td>
                                                            <td style="width: 50%">
                                                                <label style="font-weight: normal" id="porcentajeValor"></label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="width: 50%"><strong>Absoluto</strong></td>
                                                            <td style="width: 50%">
                                                                <label style="font-weight: normal" id="absolutoValor"></label>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <br />
                            <br />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Contacto</th>
                                        <th scope="col">Departamento</th>
                                        <th scope="col">E-mail</th>
                                        <th scope="col">Telefono</th>
                                    </tr>
                                </thead>
                                <tbody id="contentReportContact">
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <br />
                            <br />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Cliente</th>
                                        <th scope="col">Volumen Comrometido</th>
                                        <th scope="col">Desde</th>
                                        <th scope="col">Hasta</th>
                                    </tr>
                                </thead>
                                <tbody id="contentReportVolume">
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    <script src="../../Scripts/Core/Pages/report.js"></script>
</asp:Content>
