Public Interface IGenericrReadBusiness(Of TEntity)
	Function Gett() As Object
	Function GettById(id As Long) As Object
	Function GettByName(name As String) As Object
End Interface
