USE db_expedientes;
GO

IF OBJECT_ID('sp_Indicios_Crear') IS NOT NULL
    DROP PROCEDURE sp_Indicios_Crear;
GO

CREATE PROCEDURE sp_Indicios_Crear
    @id INT,
    @expediente_id INT,
    @codigo NVARCHAR(50),
    @descripcion NVARCHAR(255),
    @peso DECIMAL(10,2),
    @color NVARCHAR(50),
    @tamano NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO Indicios (id, expediente_id, codigo, descripcion, peso, color, tamano)
    VALUES (@id, @expediente_id, @codigo, @descripcion, @peso, @color, @tamano);
END;
GO
