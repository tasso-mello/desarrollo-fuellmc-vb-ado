Imports System.IO

Public Class Conversions

    Public Shared Function StreamString(ByVal inuputStream As StreamReader) As String
        inuputStream.BaseStream.Seek(0, SeekOrigin.Begin)
        Return inuputStream.ReadToEnd()
    End Function


End Class
