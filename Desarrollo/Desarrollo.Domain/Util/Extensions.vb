Imports System.IO
Imports System.Runtime.CompilerServices
Imports Desarrollo.Data

Module Extensions

#Region "Provider"
    <Extension()>
    Public Function ToProvider(ByVal provider As EProvider) As Provider
        Return New Provider With {
                .Id = provider.Id,
                .Direccion = provider.Direccion,
                .Nombre = provider.Nombre,
                .Ref = provider.Ref
            }
    End Function

    <Extension()>
    Public Function ToEProvider(ByVal provider As Provider) As EProvider
        Return New EProvider With {
                .Id = provider.Id,
                .Direccion = provider.Direccion,
                .Nombre = provider.Nombre,
                .Ref = provider.Ref
            }
    End Function
#End Region

#Region "Client"
    <Extension()>
    Public Function ToClient(ByVal client As EClient) As Client
        Return New Client With {
                .Id = client.Id,
                .Nombre = client.Nombre,
                .DiasPago = client.DiasPago,
                .Temperatura = client.Temperatura,
                .Flete = client.Flete,
                .Tipo = client.Tipo,
                .Porcentaje = client.Porcentaje,
                .Absoluto = client.Absoluto,
                .ProviderId = client.ProviderId,
                .Provider = New Provider()
            }
    End Function

    <Extension()>
    Public Function ToEClient(ByVal client As Client) As EClient
        Return New EClient With {
                .Id = client.Id,
                .Nombre = client.Nombre,
                .DiasPago = client.DiasPago,
                .Temperatura = CShort(client.Temperatura),
                .Flete = CShort(client.Flete),
                .Tipo = client.Tipo,
                .Porcentaje = client.Porcentaje,
                .Absoluto = client.Absoluto,
                .ProviderId = client.ProviderId
            }
    End Function
#End Region

#Region "Contact"
    <Extension()>
    Public Function ToContact(ByVal contact As EContact) As Contact
        Return New Contact With {
                .Id = contact.Id,
                .Nombre = contact.Nombre,
                .Departamento = contact.Departamento,
                .Email = contact.Email,
                .Telefono = contact.Telefono,
                .ProviderId = contact.ProviderId,
                .Provider = New Provider()
            }
    End Function

    <Extension()>
    Public Function ToEContact(ByVal Contact As Contact) As EContact
        Return New EContact With {
                .Id = Contact.Id,
                .Nombre = Contact.Nombre,
                .Departamento = Contact.Departamento,
                .Email = Contact.Email,
                .Telefono = Contact.Telefono,
                .ProviderId = Contact.ProviderId
            }
    End Function
#End Region

#Region "Volume"
    <Extension()>
    Public Function ToVolume(ByVal volume As EVolume) As Volume
        Return New Volume With {
                .Id = volume.Id,
                .ClientId = volume.ClientId,
                .Cliente = New Client(),
                .Desde = volume.Desde,
                .DesdeFormated = volume.Desde.ToString("dd/MM/yyyy"),
                .Hasta = volume.Hasta,
                .HastaFormated = volume.Hasta.ToString("dd/MM/yyyy"),
                .VolumeComprometido = volume.VolumeComprometido
            }
    End Function

    <Extension()>
    Public Function ToEVolume(ByVal volume As Volume) As EVolume
        Return New EVolume With {
                .Id = volume.Id,
                .ClientId = volume.ClientId,
                .Desde = volume.Desde,
                .Hasta = volume.Hasta,
                .VolumeComprometido = volume.VolumeComprometido
            }
    End Function
#End Region

End Module
