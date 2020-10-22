Public Interface IGenericPersistBusiness(Of TEntity)
	Function Save(obj As TEntity) As Object
	Function Update(obj As TEntity) As Object
	Function Delete(obj As TEntity) As Object
End Interface
