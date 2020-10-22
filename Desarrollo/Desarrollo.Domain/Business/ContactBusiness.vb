Imports System.Globalization
Imports Desarrollo.Data
Imports Desarrollo.Domain.My.Resources.Resources
Public Class ContactBusiness
    Implements IContactBusiness

    Private Shared _contactRepository As IContactRepository
    Private Shared _providerBusiness As IProviderBusiness

    Public Sub New(connectionString As String)
        _contactRepository = New ContactRepository(connectionString)
        _providerBusiness = New ProviderBusiness(connectionString)
    End Sub

    Public Function GetContactByProviderId(providerId As Long) As Object Implements IContactBusiness.GetContactByProviderId
        Try
            Return _contactRepository.GetContactByProviderId(ReplaceValuesObject(providerId, GettContactByProviderId)).Select(Function(c) c.ToContact())
        Catch ex As Exception
            Return Nothing
        End Try
    End Function

    Public Function Gett() As Object Implements IGenericrReadBusiness(Of Contact).Gett
        Try
            Dim contacts = _contactRepository.GetAll(ContactGett).Select(Function(c) c.ToContact()).ToList()
            contacts.ForEach(Sub(p) p.Provider = _providerBusiness.GettById(p.ProviderId))

            Return contacts
        Catch ex As Exception
            Return Nothing
        End Try
    End Function

    Public Function GettById(id As Long) As Object Implements IGenericrReadBusiness(Of Contact).GettById
        Try
            Return _contactRepository.GetById(ReplaceValuesObject(id, ContactGettById)).ToContact()
        Catch ex As Exception
            Return Nothing
        End Try
    End Function

    Public Function GettByName(name As String) As Object Implements IGenericrReadBusiness(Of Contact).GettByName
        Throw New NotImplementedException()
    End Function

    Public Function Save(obj As Contact) As Object Implements IGenericPersistBusiness(Of Contact).Save
        Try
            Return _contactRepository.Add(ReplaceValuesObject(obj, ContactInsert))
        Catch ex As Exception
            Return Nothing
        End Try
    End Function

    Public Function Update(obj As Contact) As Object Implements IGenericPersistBusiness(Of Contact).Update
        Try
            Return _contactRepository.Update(ReplaceValuesObject(obj, ContactUpdate))
        Catch ex As Exception
            Return Nothing
        End Try
    End Function

    Public Function Delete(obj As Contact) As Object Implements IGenericPersistBusiness(Of Contact).Delete
        Try
            Return _contactRepository.Delete(ReplaceValuesObject(obj.Id, ContactDelete))
        Catch ex As Exception
            Return Nothing
        End Try
    End Function

    Private Function ReplaceValuesObject(ByVal obj As Contact, ByVal sql As String) As String
        sql = sql.Replace("{Nombre}", obj.Nombre) _
                 .Replace("{Departamento}", obj.Departamento) _
                 .Replace("{Email}", obj.Email) _
                 .Replace("{Telefono}", obj.Telefono) _
                 .Replace("{ProviderId}", obj.ProviderId)

        If (obj.Id > 0) Then
            sql = sql.Replace("{Id}", obj.Id)
        End If

        Return sql
    End Function

    Private Function ReplaceValuesObject(ByVal id As Long, ByVal sql As String) As String
        Return sql.Replace("{Id}", id)
    End Function
End Class
