const bcrypt = require('bcrypt');

const usuarios = [
    {
        id: 1,
        usuario: "karely",
        password: bcrypt.hashSync("1234", 10)
    }
];

module.exports = usuarios;