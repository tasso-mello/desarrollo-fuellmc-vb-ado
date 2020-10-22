Imports System.Linq.Expressions

Public Interface IRepository(Of T)
    Function Add(sql As String) As Integer
    Function Add(entity As T) As T
    Function AddAll(sql As String) As Integer
    Function AddAll(entities As IEnumerable(Of T)) As T
    Function Update(sql As String) As Integer
    Function Update(entity As T) As T
    Function UpdateAll(sql As String) As T
    Function UpdateAll(entities As IEnumerable(Of T)) As T
    Function Delete(sql As String) As Integer
    Function Delete(entity As T) As T
    Function Delete(where As Expression(Of Func(Of T, Boolean))) As T
    Function GetById(sql As String) As T
    Function GetById(id As Long) As T
    Function Gett(sql As String, where As Expression(Of Func(Of T, Boolean)), Optional includes As List(Of String) = Nothing) As T
    Function Gett(where As Expression(Of Func(Of T, Boolean)), Optional includes As List(Of String) = Nothing) As T
    Function GetAll(sql As String) As IEnumerable(Of T)
    Function GetAll(Optional includes As List(Of String) = Nothing) As IEnumerable(Of T)
    Function GetMany(sql As String) As IEnumerable(Of T)
    Function GetMany(where As Expression(Of Func(Of T, Boolean)), Optional includes As List(Of String) = Nothing) As IEnumerable(Of T)
End Interface
