Imports System.Linq.Expressions

Public Interface IProviderRepository
    Inherits IRepository(Of EProvider)
End Interface

Public Class ProviderRepository
    Inherits Repository(Of EProvider)
    Implements IProviderRepository

    Public Sub New(connectioString As String)
        MyBase.New(connectioString)
    End Sub

End Class
