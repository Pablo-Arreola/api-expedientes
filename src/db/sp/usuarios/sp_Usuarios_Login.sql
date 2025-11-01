USE db_expedientes;
GO

IF OBJECT_ID('sp_Usuarios_Login') IS NOT NULL
    DROP PROCEDURE sp_Usuarios_Login;
GO

CREATE PROCEDURE sp_Usuarios_Login
    @email NVARCHAR(150)
AS
BEGIN
    SET NOCOUNT ON;
    SELECT id, nombre, email, passwordHash, rol, activo
    FROM Usuarios
    WHERE email = @email AND activo = 1;
END;
GO
