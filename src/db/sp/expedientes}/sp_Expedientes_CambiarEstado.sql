USE db_expedientes;
GO

IF OBJECT_ID('sp_Expedientes_CambiarEstado') IS NOT NULL
    DROP PROCEDURE sp_Expedientes_CambiarEstado;
GO

CREATE PROCEDURE sp_Expedientes_CambiarEstado
    @id INT,
    @estado NVARCHAR(50),
    @justificacion NVARCHAR(255),
    @aprobador_id INT
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Expedientes
    SET estado = @estado,
        justificacion = @justificacion,
        aprobador_id = @aprobador_id,
        fecha_estado = SYSDATETIME()
    WHERE id = @id;
END;
GO
