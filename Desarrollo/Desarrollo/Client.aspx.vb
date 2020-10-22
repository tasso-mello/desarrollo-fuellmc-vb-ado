Imports System.IO
Imports System.Web.Script.Services
Imports System.Web.Services
Imports Desarrollo.Domain
Imports Newtonsoft.Json

Public Class Client
    Inherits Page

    Private Shared _clientBusiness As IClientBusiness

    Public Sub New()
        _clientBusiness = New ClientBusiness(ConfigurationManager.ConnectionStrings("DesarrolloProveedores").ConnectionString)
    End Sub


    <WebMethod>
    <ScriptMethod(UseHttpGet:=True, ResponseFormat:=ResponseFormat.Json)>
    Public Shared Function GetClients() As Object
        Return _clientBusiness.Gett()
    End Function

    <WebMethod>
    <ScriptMethod(UseHttpGet:=True, ResponseFormat:=ResponseFormat.Json)>
    Public Shared Function GetClientByProviderId() As Object
        Return _clientBusiness.GetClientByProviderId(CLng(HttpContext.Current.Request.QueryString("id")))
    End Function

    <WebMethod>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Shared Function SaveClient() As Object

        Dim requestStream = New StreamReader(HttpContext.Current.Request.InputStream)

        If (CBool(HttpContext.Current.Request.QueryString("isUpdate"))) Then
            _clientBusiness.Update(JsonConvert.DeserializeObject(Of Domain.Client)(Conversions.StreamString(requestStream)))
        Else
            _clientBusiness.Save(JsonConvert.DeserializeObject(Of Domain.Client)(Conversions.StreamString(requestStream)))
        End If

    End Function

    <WebMethod>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Shared Function DeleteClient() As Object

        Dim requestStream = New StreamReader(HttpContext.Current.Request.InputStream)

        _clientBusiness.Delete(JsonConvert.DeserializeObject(Of Domain.Client)(Conversions.StreamString(requestStream)))

    End Function
End Class