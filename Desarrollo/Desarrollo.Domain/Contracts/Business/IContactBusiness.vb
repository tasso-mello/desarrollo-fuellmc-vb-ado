Public Interface IContactBusiness
    Inherits IGenericPersistBusiness(Of Contact), IGenericrReadBusiness(Of Contact)

    Function GetContactByProviderId(providerId As Long) As Object
End Interface
