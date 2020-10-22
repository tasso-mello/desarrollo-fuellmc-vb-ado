SELECT 
	Id,
    Nombre,
    DiasPago,
    Temperatura,
    Flete,
    Tipo,
    Porcentaje,
    Absoluto,
    ProviderId
FROM Client
Where ProviderId = {Id}