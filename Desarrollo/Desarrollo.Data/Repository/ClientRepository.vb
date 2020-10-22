Imports System.Linq.Expressions

Public Interface IClientRepository
    Inherits IRepository(Of EClient)

    Function GetClientByProviderId(sql As String) As EClient

End Interface

Public Class ClientRepository
    Inherits Repository(Of EClient)
    Implements IClientRepository

    Public Sub New(connectioString As String)
        MyBase.New(connectioString)
    End Sub

    Public Function GetClientByProviderId(sql As String) As EClient Implements IClientRepository.GetClientByProviderId
        Return GetById(sql)
    End Function
End Class
