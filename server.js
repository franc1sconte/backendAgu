// 1️⃣ Importamos dependencias necesarias
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// 2️⃣ Creamos una instancia de Express
const app = express();

// 3️⃣ Middleware - Configuraciones globales
app.use(cors()); // Habilita CORS para permitir peticiones de otros dominios
app.use(express.json()); // Permite recibir y procesar datos en formato JSON

// 4️⃣ Definimos el puerto (usando .env si existe, sino el 3000 por defecto)
const PORT = process.env.PORT || 3000;

// 5️⃣ Ruta básica de prueba
app.get("/", (req, res) => {
    res.send("API funcionando 🚀");
});

// 6️⃣ Importamos y usamos las rutas del CRUD
const crudRoutes = require("./routes/crudRoutes.js");
app.use("/api/items", crudRoutes);

// 7️⃣ Iniciamos el servidor en el puerto definido
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
