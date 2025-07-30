const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');
const path = require('path');

const app = express();
const db = new sqlite3.Database('./db.sqlite');

const upload = multer();

app.use(express.static(__dirname));

app.post('/login', upload.none(), (req, res) => {
    console.log("BODY:", req.body);

    const { usuario, contrasena } = req.body;

    if (!usuario || !contrasena) {
        return res.status(400).send("Datos incompletos");
    }

    db.get('SELECT * FROM usuarios WHERE usuario = ? AND contrasena = ?', [usuario, contrasena], (err, row) => {
        if (err) {
            console.error("Error en la base de datos:", err.message);
            res.status(500).send("error");
        } else if (row) {
            res.send("ok");
        } else {
            res.send("fail");
        }
    });
});

app.listen(3000, () => {
    console.log("Servidor funcionando en http://localhost:3000");
});
