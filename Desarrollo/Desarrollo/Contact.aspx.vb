Imports System.IO
Imports System.Web.Script.Services
Imports System.Web.Services
Imports Desarrollo.Domain
Imports Newtonsoft.Json

Public Class Contact
    Inherits Page

    Private Shared _contactBusiness As IContactBusiness

    Public Sub New()
        _contactBusiness = New ContactBusiness(ConfigurationManager.ConnectionStrings("DesarrolloProveedores").ConnectionString)
    End Sub

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As EventArgs) Handles Me.Load

    End Sub

    <WebMethod>
    <ScriptMethod(UseHttpGet:=True, ResponseFormat:=ResponseFormat.Json)>
    Public Shared Function GetContacts() As Object
        Return _contactBusiness.Gett()
    End Function

    <WebMethod>
    <ScriptMethod(UseHttpGet:=True, ResponseFormat:=ResponseFormat.Json)>
    Public Shared Function GetContactByProviderId() As Object
        Return _contactBusiness.GetContactByProviderId(CLng(HttpContext.Current.Request.QueryString("id")))
    End Function

    <WebMethod>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Shared Function SaveContact() As Object

        Dim requestStream = New StreamReader(HttpContext.Current.Request.InputStream)

        If (CBool(HttpContext.Current.Request.QueryString("isUpdate"))) Then
            _contactBusiness.Update(JsonConvert.DeserializeObject(Of Domain.Contact)(Conversions.StreamString(requestStream)))
        Else
            _contactBusiness.Save(JsonConvert.DeserializeObject(Of Domain.Contact)(Conversions.StreamString(requestStream)))
        End If

    End Function

    <WebMethod>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Shared Function DeleteContact() As Object

        Dim requestStream = New StreamReader(HttpContext.Current.Request.InputStream)

        _contactBusiness.Delete(JsonConvert.DeserializeObject(Of Domain.Contact)(Conversions.StreamString(requestStream)))

    End Function
End Class