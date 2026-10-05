const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();

const usuarios = require('../usuarios');

router.post('/login', (req, res) => {

    const { usuario, password } = req.body;

    const encontrado = usuarios.find(
        u => u.usuario === usuario
    );

    if (!encontrado) {
        return res.status(401).json({
            mensaje: "Usuario incorrecto"
        });
    }

    const valido = bcrypt.compareSync(
        password,
        encontrado.password
    );

    if (!valido) {
        return res.status(401).json({
            mensaje: "Contraseña incorrecta"
        });
    }

    const token = jwt.sign(
        {
            id: encontrado.id,
            usuario: encontrado.usuario
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h'
        }
    );

    res.json({
        mensaje: "Login correcto",
        token: token
    });

});
module.exports = router;