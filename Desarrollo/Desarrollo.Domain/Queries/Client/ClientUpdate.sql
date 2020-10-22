UPDATE Cliente 
    SET 
        Nombre = '{Nombre}',
        DiasPago = {DiasPago},
        Temperatura = {Temperatura},
        Flete = {Flete},
        Tipo = {Tipo},
        Porcentaje = {Porcentaje},
        Absoluto = '{Absoluto}',
        ProviderId = {ProviderId}
WHERE Id = {Id}