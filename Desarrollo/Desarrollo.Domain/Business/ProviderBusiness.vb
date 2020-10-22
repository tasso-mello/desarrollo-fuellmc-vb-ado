Imports Desarrollo.Data
Imports Desarrollo.Domain.My.Resources.Resources
Public Class ProviderBusiness
    Implements IProviderBusiness

    Private Shared _providerRepository As IProviderRepository

    Public Sub New(connectionString As String)
        _providerRepository = New ProviderRepository(connectionString)
    End Sub

    Public Function Gett() As Object Implements IGenericrReadBusiness(Of Provider).Gett
        Try
            Return _providerRepository.GetAll(ProviderGett).Select(Function(p) p.ToProvider())
        Catch ex As Exception
            Return Nothing
        End Try
    End Function

    Public Function GettById(id As Long) As Object Implements IGenericrReadBusiness(Of Provider).GettById
        Try
            Return _providerRepository.GetById(ReplaceValuesObject(id, ProviderGettById)).ToProvider()
        Catch ex As Exception
            Return Nothing
        End Try
    End Function

    Public Function GettByName(name As String) As Object Implements IGenericrReadBusiness(Of Provider).GettByName
        Throw New NotImplementedException()
    End Function

    Public Function Save(obj As Provider) As Object Implements IGenericPersistBusiness(Of Provider).Save
        Try
            Return _providerRepository.Add(ReplaceValuesObject(obj, ProviderInsert))
        Catch ex As Exception
            Return Nothing
        End Try
    End Function

    Public Function Update(obj As Provider) As Object Implements IGenericPersistBusiness(Of Provider).Update
        Try
            Return _providerRepository.Update(ReplaceValuesObject(obj, ProviderUpdate))
        Catch ex As Exception
            Return Nothing
        End Try
    End Function

    Public Function Delete(obj As Provider) As Object Implements IGenericPersistBusiness(Of Provider).Delete
        Try
            Return _providerRepository.Delete(ReplaceValuesObject(obj, ProviderDelete))
        Catch ex As Exception
            Return Nothing
        End Try
    End Function

    Private Function ReplaceValuesObject(ByVal obj As Provider, ByVal sql As String) As String
        sql = sql.Replace("{Nombre}", obj.Nombre).Replace("{Direccion}", obj.Direccion).Replace("{Ref}", obj.Ref)

        If (obj.Id > 0) Then
            sql = sql.Replace("{Id}", obj.Id)
        End If

        Return sql
    End Function

    Private Function ReplaceValuesObject(ByVal id As Long, ByVal sql As String) As String
        Return sql.Replace("{Id}", id)
    End Function
End Class
