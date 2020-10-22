Imports System.Linq.Expressions
Imports System.Data.SqlClient
Imports Desarrollo.Data.My
Imports System.Reflection

Public Class Repository(Of T)
    Implements IRepository(Of T)

    Private connection As SqlConnection
    Private command As SqlCommand

    Public Sub New(connectioString As String)
        OpenConnection(connectioString)
    End Sub

    Private Function Add(sql As String) As Integer Implements IRepository(Of T).Add
        Return ExecutePersistQuery(sql)
    End Function

    Private Function Add(entity As T) As T Implements IRepository(Of T).Add
        Throw New NotImplementedException()
    End Function

    Private Function AddAll(sql As String) As Integer Implements IRepository(Of T).AddAll
        Throw New NotImplementedException()
    End Function

    Private Function AddAll(entities As IEnumerable(Of T)) As T Implements IRepository(Of T).AddAll
        Throw New NotImplementedException()
    End Function

    Private Function Update(sql As String) As Integer Implements IRepository(Of T).Update
        Return ExecutePersistQuery(sql)
    End Function

    Private Function Update(entity As T) As T Implements IRepository(Of T).Update
        Throw New NotImplementedException()
    End Function

    Private Function UpdateAll(sql As String) As T Implements IRepository(Of T).UpdateAll
        Throw New NotImplementedException()
    End Function

    Private Function IRepository_UpdateAll1(entities As IEnumerable(Of T)) As T Implements IRepository(Of T).UpdateAll
        Throw New NotImplementedException()
    End Function

    Private Function Delete(sql As String) As Integer Implements IRepository(Of T).Delete
        Return ExecutePersistQuery(sql)
    End Function

    Private Function Delete(entity As T) As T Implements IRepository(Of T).Delete
        Throw New NotImplementedException()
    End Function

    Private Function Delete(where As Expression(Of Func(Of T, Boolean))) As T Implements IRepository(Of T).Delete
        Throw New NotImplementedException()
    End Function

    Public Function GetById(sql As String) As T Implements IRepository(Of T).GetById
        command = New SqlCommand(sql, connection)

        Dim listResult As New List(Of T)
        Dim reader = command.ExecuteReader()
        CloseConnection()
        Mapper(listResult, reader)

        Return listResult.FirstOrDefault()
    End Function

    Public Function GetById(id As Long) As T Implements IRepository(Of T).GetById
        Throw New NotImplementedException()
    End Function

    Public Function Gett(sql As String, where As Expression(Of Func(Of T, Boolean)), Optional includes As List(Of String) = Nothing) As T Implements IRepository(Of T).Gett
        Throw New NotImplementedException()
    End Function

    Public Function Gett(where As Expression(Of Func(Of T, Boolean)), Optional includes As List(Of String) = Nothing) As T Implements IRepository(Of T).Gett
        Throw New NotImplementedException()
    End Function

    Public Function GetAll(sql As String) As IEnumerable(Of T) Implements IRepository(Of T).GetAll
        command = New SqlCommand(sql, connection)

        Dim listResult As New List(Of T)
        Dim reader = command.ExecuteReader()
        CloseConnection()
        Mapper(listResult, reader)

        Return listResult
    End Function

    Public Function GetAll(Optional includes As List(Of String) = Nothing) As IEnumerable(Of T) Implements IRepository(Of T).GetAll
        Throw New NotImplementedException()
    End Function

    Public Function GetMany(sql As String) As IEnumerable(Of T) Implements IRepository(Of T).GetMany
        Throw New NotImplementedException()
    End Function

    Public Function GetMany(where As Expression(Of Func(Of T, Boolean)), Optional includes As List(Of String) = Nothing) As IEnumerable(Of T) Implements IRepository(Of T).GetMany
        Throw New NotImplementedException()
    End Function

    Private Function CloseConnection()

    End Function

    Private Function OpenConnection(connectionString As String)
        connection = New SqlConnection(connectionString)
        connection.Open()
    End Function

    Private Function Mapper(ByRef listResult As List(Of T), ByVal reader As SqlDataReader)
        While reader.Read()
            Dim resultObject As T
            resultObject = Activator.CreateInstance(Of T)()

            For Each prop As PropertyInfo In resultObject.GetType().GetProperties()
                If Not Object.Equals(reader(prop.Name), DBNull.Value) Then
                    prop.SetValue(resultObject, reader(prop.Name), Nothing)
                End If
            Next

            listResult.Add(resultObject)
        End While
    End Function

    Private Function ExecutePersistQuery(sql As String) As Integer
        command = New SqlCommand(sql, connection)
        Dim result = command.ExecuteNonQuery()
        CloseConnection()
        Return result
    End Function

End Class
