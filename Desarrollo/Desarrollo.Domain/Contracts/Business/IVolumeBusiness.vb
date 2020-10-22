Public Interface IVolumeBusiness
    Inherits IGenericPersistBusiness(Of Volume), IGenericrReadBusiness(Of Volume)
    Function GetVolumeByClientId(clientId As Long) As Object
End Interface
