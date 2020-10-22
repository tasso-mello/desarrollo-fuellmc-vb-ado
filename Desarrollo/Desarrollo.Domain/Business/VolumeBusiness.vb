Imports System.Globalization
Imports Desarrollo.Data
Imports Desarrollo.Domain.My.Resources.Resources
Public Class VolumeBusiness
    Implements IVolumeBusiness

    Private Shared _vomuleRepository As IVolumeRepository
    Private Shared _clientBusiness As IClientBusiness

    Public Sub New(connectionString As String)
        _vomuleRepository = New VolumeRepository(connectionString)
        _clientBusiness = New ClientBusiness(connectionString)
    End Sub

    Public Function GetVolumeByClientId(clientId As Long) As Object Implements IVolumeBusiness.GetVolumeByClientId
        Try
            Dim volumes = _vomuleRepository.GetVolumeByClientId(ReplaceValuesObject(clientId, GettVolumeByClientId)).Select(Function(c) c.ToVolume()).ToList()
            volumes.ForEach(Sub(p) p.Cliente = _clientBusiness.GettById(p.ClientId))

            Return volumes
        Catch ex As Exception
            Return Nothing
        End Try
    End Function

    Public Function Gett() As Object Implements IGenericrReadBusiness(Of Volume).Gett
        Try
            Dim volumes = _vomuleRepository.GetAll(VolumeGett).Select(Function(c) c.ToVolume()).ToList()
            volumes.ForEach(Sub(p) p.Cliente = _clientBusiness.GettById(p.ClientId))

            Return Volumes
        Catch ex As Exception
            Return Nothing
        End Try
    End Function

    Public Function GettById(id As Long) As Object Implements IGenericrReadBusiness(Of Volume).GettById
        Try
            Return _vomuleRepository.GetById(ReplaceValuesObject(id, VolumeGettById)).ToVolume()
        Catch ex As Exception
            Return Nothing
        End Try
    End Function

    Public Function GettByName(name As String) As Object Implements IGenericrReadBusiness(Of Volume).GettByName
        Throw New NotImplementedException()
    End Function

    Public Function Save(obj As Volume) As Object Implements IGenericPersistBusiness(Of Volume).Save
        Try
            Return _vomuleRepository.Add(ReplaceValuesObject(obj, VolumeInsert))
        Catch ex As Exception
            Return Nothing
        End Try
    End Function

    Public Function Update(obj As Volume) As Object Implements IGenericPersistBusiness(Of Volume).Update
        Try
            Return _vomuleRepository.Update(ReplaceValuesObject(obj, VolumeUpdate))
        Catch ex As Exception
            Return Nothing
        End Try
    End Function

    Public Function Delete(obj As Volume) As Object Implements IGenericPersistBusiness(Of Volume).Delete
        Try
            Return _vomuleRepository.Delete(ReplaceValuesObject(obj.Id, VolumeDelete))
        Catch ex As Exception
            Return Nothing
        End Try
    End Function

    Private Function ReplaceValuesObject(ByVal obj As Volume, ByVal sql As String) As String
        sql = sql.Replace("{ClientId}", obj.ClientId) _
                 .Replace("{VolumeComprometido}", obj.VolumeComprometido) _
                 .Replace("{Desde}", obj.Desde) _
                 .Replace("{Hasta}", obj.Hasta)

        If (obj.Id > 0) Then
            sql = sql.Replace("{Id}", obj.Id)
        End If

        Return sql
    End Function

    Private Function ReplaceValuesObject(ByVal id As Long, ByVal sql As String) As String
        Return sql.Replace("{Id}", id)
    End Function
End Class
