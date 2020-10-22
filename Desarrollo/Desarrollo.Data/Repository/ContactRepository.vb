Public Interface IContactRepository
    Inherits IRepository(Of EContact)
    Function GetContactByProviderId(sql As String) As IEnumerable(Of EContact)
End Interface

Public Class ContactRepository
    Inherits Repository(Of EContact)
    Implements IContactRepository

    Public Sub New(connectioString As String)
        MyBase.New(connectioString)
    End Sub

    Public Function GetContactByProviderId(sql As String) As IEnumerable(Of EContact) Implements IContactRepository.GetContactByProviderId
        Return GetAll(sql)
    End Function
End Class
