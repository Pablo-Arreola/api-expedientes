USE db_expedientes;
GO

IF OBJECT_ID('sp_Expedientes_Crear') IS NOT NULL
    DROP PROCEDURE sp_Expedientes_Crear;
GO

CREATE PROCEDURE sp_Expedientes_Crear
    @id INT,
    @codigo NVARCHAR(50),
    @descripcion NVARCHAR(255),
    @tecnico_id INT
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO Expedientes (id, codigo, descripcion, tecnico_id)
    VALUES (@id, @codigo, @descripcion, @tecnico_id);
END;
GO
