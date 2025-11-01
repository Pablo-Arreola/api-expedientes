USE db_expedientes;
GO

IF OBJECT_ID('sp_Expedientes_Listar') IS NOT NULL
    DROP PROCEDURE sp_Expedientes_Listar;
GO

CREATE PROCEDURE sp_Expedientes_Listar
AS
BEGIN
    SET NOCOUNT ON;
    SELECT e.*, u.nombre AS tecnico_nombre
    FROM Expedientes e
    JOIN Usuarios u ON e.tecnico_id = u.id
    WHERE e.activo = 1
    ORDER BY e.fechaCreacion DESC;
END;
GO
