<div align="center">

# 🧾 **API REST — Gestión de Expedientes e Indicios**
### Universidad Mariano Gálvez de Guatemala — 2025

![UMG Logo](https://upload.wikimedia.org/wikipedia/commons/8/89/Logo_UMG.png)

**Curso:** 036 – Desarrollo Web  
**Catedrático:** Ing. Carmelo Mayén  
**Estudiante:** Pablo Raúl Arreola Contreras  
**Carnet:** 1790‑21‑18516  

</div>

---

## 📘 Descripción del Proyecto

API REST desarrollada en **TypeScript + Express** con persistencia en **SQL Server** mediante **Stored Procedures (SP)**, autenticación **JWT**, control de roles (**Técnico / Coordinador**) y documentación profesional con **Swagger UI**.  

Permite gestionar **usuarios, expedientes e indicios**, aplicando flujos de aprobación y eliminación lógica (`activo`).

---

## ⚙️ Tecnologías principales

| Tecnología | Descripción |
|-------------|--------------|
| **Node.js + Express** | Servidor backend REST |
| **TypeScript** | Tipado estático y mejor mantenimiento |
| **SQL Server 2022** | Base de datos relacional |
| **JWT (jsonwebtoken)** | Autenticación segura por token |
| **bcrypt** | Cifrado de contraseñas |
| **swagger-ui-express + swagger-jsdoc** | Documentación interactiva |
| **dotenv** | Variables de entorno |
| **mssql** | Conector oficial SQL Server |

---

## 📁 Estructura del Proyecto

```
api-expedientes/
├─ src/
│  ├─ app.ts
│  ├─ server.ts
│  ├─ swagger.ts
│  ├─ config/
│  ├─ db/
│  ├─ auth/
│  ├─ models/
│  ├─ controllers/
│  ├─ routes/
│  ├─ middlewares/
│  └─ types/
├─ scripts/
├─ .env.example
├─ tsconfig.json
├─ package.json
└─ README.md
```

---

## 🔐 Variables de entorno (.env)

```env
PORT=3000
DB_SERVER=localhost\SQLEXPRESS
DB_USER=sa
DB_PASSWORD=12345
DB_NAME=db_expedientes
DB_PORT=1433
JWT_SECRET=mi_clave_secreta_segura
```

---

## 🚀 Instalación y ejecución

```bash
git clone https://github.com/Pablo-Arreola/api-expedientes.git
cd api-expedientes
npm install
npm run dev
```

Luego abre 👉 **http://localhost:3000/docs**  
para acceder a Swagger.

---

## 📜 Endpoints principales

| Método | Endpoint | Descripción | Rol |
|--------|-----------|--------------|------|
| **POST** | `/auth/login` | Inicia sesión (JWT) | Público |
| **GET** | `/usuarios` | Lista usuarios activos | Coordinador |
| **POST** | `/usuarios` | Crea usuario nuevo | Coordinador |
| **GET** | `/expedientes` | Lista expedientes | Ambos |
| **POST** | `/expedientes` | Crea expediente | Técnico |
| **PUT** | `/expedientes/{id}` | Actualiza descripción | Técnico |
| **PATCH** | `/expedientes/{id}/estado` | Aprueba / Rechaza | Coordinador |
| **PATCH** | `/expedientes/{id}/activo` | Activa / Desactiva | Coordinador |
| **GET** | `/indicios/{expediente_id}` | Lista indicios | Ambos |
| **POST** | `/indicios` | Crea indicio | Técnico |
| **PUT** | `/indicios/{id}` | Actualiza indicio | Técnico |
| **PATCH** | `/indicios/{id}/activo` | Activa / Desactiva | Coordinador |

---

## 🧠 Roles del sistema

| Rol | Permisos principales |
|-----|----------------------|
| **Técnico** | Crear / Editar sus expedientes e indicios |
| **Coordinador** | Aprobar / Rechazar / Crear usuarios / Soft delete |

---

## 🧩 Seguridad JWT

1️⃣ Inicia sesión en `/auth/login`  
2️⃣ Copia el token devuelto  
3️⃣ En Swagger (candado 🔒) pega:  
```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

---

## 🧾 Créditos

**Proyecto académico — Universidad Mariano Gálvez de Guatemala, 2025**  
**Curso:** 036 – Desarrollo Web  
**Catedrático:** Ing. Carmelo Mayén  
**Estudiante:** Pablo Raúl Arreola Contreras (1790‑21‑18516)

---

<div align="center">

💙 *"El código bien estructurado también es una forma de arte."* 💙

</div>
