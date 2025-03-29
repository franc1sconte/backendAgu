const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const filePath = path.join(__dirname, "../data.json");

// Función para leer el archivo
const readData = () => {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
};

// Función para escribir en el archivo
const writeData = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// 🔹 CREATE - Agregar un item
router.post("/", (req, res) => {
    const items = readData();
    const newItem = { id: items.length + 1, name: req.body.name };
    items.push(newItem);
    writeData(items);
    res.status(201).json(newItem);
});

// 🔹 READ - Obtener items
router.get("/", (req, res) => {
    res.json(readData());
});

// 🔹 UPDATE - Modificar un item
router.put("/:id", (req, res) => {
    let items = readData();
    const index = items.findIndex(item => item.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Item no encontrado" });

    items[index].name = req.body.name;
    writeData(items);
    res.json(items[index]);
});

// 🔹 DELETE - Eliminar un item
router.delete("/:id", (req, res) => {
    let items = readData();
    items = items.filter(item => item.id !== parseInt(req.params.id));
    writeData(items);
    res.json({ message: "Item eliminado correctamente" });
});

module.exports = router;
