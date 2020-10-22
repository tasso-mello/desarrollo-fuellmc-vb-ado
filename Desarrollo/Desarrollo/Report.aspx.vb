Imports System.IO
Imports System.Web.Script.Services
Imports System.Web.Services
Imports Desarrollo.Domain
Imports Newtonsoft.Json

Public Class Report
    Inherits Page

    'Private Shared _vomuleBusiness As IVolumeBusiness

    Public Sub New()
        '_vomuleBusiness = New VolumeBusiness(ConfigurationManager.ConnectionStrings("DesarrolloProveedores").ConnectionString)
    End Sub

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As EventArgs) Handles Me.Load

    End Sub

    '<WebMethod>
    '<ScriptMethod(UseHttpGet:=True, ResponseFormat:=ResponseFormat.Json)>
    'Public Shared Function GetVolumes() As Object
    '    Return _vomuleBusiness.Gett()
    'End Function

    '<WebMethod>
    '<ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    'Public Shared Function SaveVolume() As Object

    '    Dim requestStream = New StreamReader(HttpContext.Current.Request.InputStream)

    '    If (CBool(HttpContext.Current.Request.QueryString("isUpdate"))) Then
    '        _vomuleBusiness.Update(JsonConvert.DeserializeObject(Of Domain.Volume)(Conversions.StreamString(requestStream)))
    '    Else
    '        _vomuleBusiness.Save(JsonConvert.DeserializeObject(Of Domain.Volume)(Conversions.StreamString(requestStream)))
    '    End If

    'End Function

    '<WebMethod>
    '<ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    'Public Shared Function DeleteVolume() As Object

    '    Dim requestStream = New StreamReader(HttpContext.Current.Request.InputStream)

    '    _vomuleBusiness.Delete(JsonConvert.DeserializeObject(Of Domain.Volume)(Conversions.StreamString(requestStream)))

    'End Function

End Class