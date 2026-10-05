const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {

    const header = req.headers.authorization;

    if (!header) {
        return res.status(401).json({
            mensaje: "Token no proporcionado"
        });
    }

    const partes = header.split(' ');
    if (partes[0] !== 'Bearer' || !partes[1]) {
        return res.status(401).json({
            mensaje: "Formato de token inválido"
        });
    }
    const token = partes[1];

    try {
        const verificado = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        req.usuario = verificado;

        next();
    } catch(error) {
        return res.status(403).json({
            mensaje: "Token inválido"
        });
    }
};

module.exports = validarJWT;