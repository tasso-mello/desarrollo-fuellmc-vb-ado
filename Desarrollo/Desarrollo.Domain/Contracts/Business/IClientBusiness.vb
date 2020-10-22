Public Interface IClientBusiness
    Inherits IGenericPersistBusiness(Of Client), IGenericrReadBusiness(Of Client)

    Function GetClientByProviderId(providerId As Long) As Object

End Interface
