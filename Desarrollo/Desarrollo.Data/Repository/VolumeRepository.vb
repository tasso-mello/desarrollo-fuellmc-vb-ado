Public Interface IVolumeRepository
    Inherits IRepository(Of EVolume)
    Function GetVolumeByClientId(sql As String) As IEnumerable(Of EVolume)
End Interface

Public Class VolumeRepository
    Inherits Repository(Of EVolume)
    Implements IVolumeRepository

    Public Sub New(connectioString As String)
        MyBase.New(connectioString)
    End Sub

    Public Function GetVolumeByClientId(sql As String) As IEnumerable(Of EVolume) Implements IVolumeRepository.GetVolumeByClientId
        Return GetAll(sql)
    End Function
End Class
