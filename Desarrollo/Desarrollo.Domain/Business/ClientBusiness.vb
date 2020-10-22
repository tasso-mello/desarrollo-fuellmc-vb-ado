Imports System.Globalization
Imports Desarrollo.Data
Imports Desarrollo.Domain.My.Resources.Resources
Public Class ClientBusiness
    Implements IClientBusiness

    Private Shared _clientRepository As IClientRepository
    Private Shared _providerBusiness As IProviderBusiness

    Public Sub New(connectionString As String)
        _clientRepository = New ClientRepository(connectionString)
        _providerBusiness = New ProviderBusiness(connectionString)
    End Sub

    Public Function GetClientByProviderId(providerId As Long) As Object Implements IClientBusiness.GetClientByProviderId
        Try
            Return _clientRepository.GetClientByProviderId(ReplaceValuesObject(providerId, GettClientByProviderId))?.ToClient()
        Catch ex As Exception
            Return Nothing
        End Try
    End Function

    Public Function Gett() As Object Implements IGenericrReadBusiness(Of Client).Gett
        Try
            Dim clients = _clientRepository.GetAll(ClientGettProc).Select(Function(c) c.ToClient()).ToList()
            clients.ForEach(Sub(p) p.Provider = _providerBusiness.GettById(p.ProviderId))

            Return clients
        Catch ex As Exception
            Return Nothing
        End Try
    End Function

    Public Function GettById(id As Long) As Object Implements IGenericrReadBusiness(Of Client).GettById
        Try
            Dim client = _clientRepository.GetById(ReplaceValuesObject(id, ClientGettById)).ToClient()
            client.Provider = _providerBusiness.GettById(client.ProviderId)

            Return client
        Catch ex As Exception
            Return Nothing
        End Try
    End Function

    Public Function GettByName(name As String) As Object Implements IGenericrReadBusiness(Of Client).GettByName
        Throw New NotImplementedException()
    End Function

    Public Function Save(obj As Client) As Object Implements IGenericPersistBusiness(Of Client).Save
        Try
            Return _clientRepository.Add(ReplaceValuesObject(obj, ClientInsert))
        Catch ex As Exception
            Return Nothing
        End Try
    End Function

    Public Function Update(obj As Client) As Object Implements IGenericPersistBusiness(Of Client).Update
        Try
            Return _clientRepository.Update(ReplaceValuesObject(obj, ClientUpdate))
        Catch ex As Exception
            Return Nothing
        End Try
    End Function

    Public Function Delete(obj As Client) As Object Implements IGenericPersistBusiness(Of Client).Delete
        Try
            Return _clientRepository.Delete(ReplaceValuesObject(obj, ClientDelete))
        Catch ex As Exception
            Return Nothing
        End Try
    End Function

    Private Function ReplaceValuesObject(ByVal obj As Client, ByVal sql As String) As String
        sql = sql.Replace("{Nombre}", obj.Nombre) _
                 .Replace("{DiasPago}", obj.DiasPago) _
                 .Replace("{Temperatura}", Convert.ToInt16(obj.Temperatura)) _
                 .Replace("{Flete}", Convert.ToInt16(obj.Flete)) _
                 .Replace("{Tipo}", obj.Tipo) _
                 .Replace("{Porcentaje}", obj.Porcentaje.ToString(New CultureInfo("en-us"))) _
                 .Replace("{Absoluto}", obj.Absoluto) _
                 .Replace("{ProviderId}", obj.ProviderId)

        If (obj.Id > 0) Then
            sql = sql.Replace("{Id}", obj.Id)
        End If

        Return sql
    End Function

    Private Function ReplaceValuesObject(ByVal id As Long, ByVal sql As String) As String
        Return sql.Replace("{Id}", id)
    End Function

End Class
