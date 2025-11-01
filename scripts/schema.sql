/* ==========================================
   📘 Creación de base de datos
==========================================*/
IF DB_ID('db_expedientes') IS NULL
BEGIN
    CREATE DATABASE db_expedientes;
END;
GO

USE db_expedientes;
GO

/* ==========================================
   🧍 Tabla Usuarios
==========================================*/
IF OBJECT_ID('Usuarios') IS NULL
CREATE TABLE Usuarios (
    id INT PRIMARY KEY,
    nombre NVARCHAR(120) NOT NULL,
    email NVARCHAR(150) NOT NULL UNIQUE,
    passwordHash NVARCHAR(255) NOT NULL,
    rol NVARCHAR(50) NOT NULL CHECK (rol IN ('Tecnico', 'Coordinador')),
    activo BIT NOT NULL DEFAULT 1,
    fechaCreacion DATETIME2 NOT NULL DEFAULT SYSDATETIME()
);
GO

/* ==========================================
   📂 Tabla Expedientes
==========================================*/
IF OBJECT_ID('Expedientes') IS NULL
CREATE TABLE Expedientes (
    id INT PRIMARY KEY,
    codigo NVARCHAR(50) NOT NULL UNIQUE,
    descripcion NVARCHAR(255) NOT NULL,
    tecnico_id INT NOT NULL,
    estado NVARCHAR(50) NOT NULL DEFAULT 'pendiente',
    justificacion NVARCHAR(255) NULL,
    aprobador_id INT NULL,
    fecha_estado DATETIME2 NULL,
    activo BIT NOT NULL DEFAULT 1,
    fechaCreacion DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    FOREIGN KEY (tecnico_id) REFERENCES Usuarios(id),
    FOREIGN KEY (aprobador_id) REFERENCES Usuarios(id)
);
GO

/* ==========================================
   🧾 Tabla Indicios
==========================================*/
IF OBJECT_ID('Indicios') IS NULL
CREATE TABLE Indicios (
    id INT PRIMARY KEY,
    expediente_id INT NOT NULL,
    codigo NVARCHAR(50) NOT NULL UNIQUE,
    descripcion NVARCHAR(255) NOT NULL,
    peso DECIMAL(10,2) CHECK (peso >= 0),
    color NVARCHAR(50),
    tamano NVARCHAR(50),
    activo BIT NOT NULL DEFAULT 1,
    fechaCreacion DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    FOREIGN KEY (expediente_id) REFERENCES Expedientes(id)
);
GO
