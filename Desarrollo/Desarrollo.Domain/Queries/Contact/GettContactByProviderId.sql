SELECT 
	Id,
    Nombre,
    Departamento,
    Email,
    Telefono,
    ProviderId
FROM Contact
Where ProviderId = {Id}