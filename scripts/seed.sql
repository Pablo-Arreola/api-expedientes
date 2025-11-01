USE db_expedientes;
GO

DELETE FROM Indicios;
DELETE FROM Expedientes;
DELETE FROM Usuarios;
GO

-- Contraseñas hash generadas con bcrypt.hash('12345', 10)
INSERT INTO Usuarios (id, nombre, email, passwordHash, rol, activo)
VALUES
(1, 'Carlos Pérez', 'tecnico@umg.edu.gt', '$2b$10$q6svZb3.CCblRkvFr44eqOox5Pv9l02vYd6DqXoA6Kx81v1.qy8g6', 'Tecnico', 1),
(2, 'María López', 'coordinador@umg.edu.gt', '$2b$10$q6svZb3.CCblRkvFr44eqOox5Pv9l02vYd6DqXoA6Kx81v1.qy8g6', 'Coordinador', 1);
GO
