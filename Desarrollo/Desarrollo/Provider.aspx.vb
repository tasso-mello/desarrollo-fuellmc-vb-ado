Imports System.IO
Imports System.Web.Script.Services
Imports System.Web.Services
Imports Desarrollo.Domain
Imports Newtonsoft.Json

Public Class Provider
    Inherits Page

    Private Shared _providerBusiness As IProviderBusiness

    Public Sub New()
        _providerBusiness = New ProviderBusiness(ConfigurationManager.ConnectionStrings("DesarrolloProveedores").ConnectionString)
    End Sub

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As EventArgs) Handles Me.Load

    End Sub

    Private Sub Provider_Init(sender As Object, e As EventArgs) Handles Me.Init

    End Sub

    Private Sub Provider_PreInit(sender As Object, e As EventArgs) Handles Me.PreInit

    End Sub

    <WebMethod>
    <ScriptMethod(UseHttpGet:=True, ResponseFormat:=ResponseFormat.Json)>
    Public Shared Function GetProviders() As Object
        Return _providerBusiness.Gett()
    End Function

    <WebMethod>
    <ScriptMethod(UseHttpGet:=True, ResponseFormat:=ResponseFormat.Json)>
    Public Shared Function GetProviderById() As Object
        Return _providerBusiness.GettById(CLng(HttpContext.Current.Request.QueryString("id")))
    End Function

    <WebMethod>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Shared Function SaveProvider() As Object

        Dim requestStream = New StreamReader(HttpContext.Current.Request.InputStream)

        If (CBool(HttpContext.Current.Request.QueryString("isUpdate"))) Then
            _providerBusiness.Update(JsonConvert.DeserializeObject(Of Domain.Provider)(Conversions.StreamString(requestStream)))
        Else
            _providerBusiness.Save(JsonConvert.DeserializeObject(Of Domain.Provider)(Conversions.StreamString(requestStream)))
        End If

    End Function

    <WebMethod>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Shared Function DeleteProvider() As Object

        Dim requestStream = New StreamReader(HttpContext.Current.Request.InputStream)

        _providerBusiness.Delete(JsonConvert.DeserializeObject(Of Domain.Provider)(Conversions.StreamString(requestStream)))

    End Function
End Class