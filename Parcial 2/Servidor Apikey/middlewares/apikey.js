const validarApiKey = (req, res, next) => {

    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
        return res.status(401).json({
            error: true,
            mensaje: 'API Key no proporcionada'
        });
    }

    if (apiKey !== process.env.API_KEY) {
        return res.status(403).json({
            error: true,
            mensaje: 'API Key no válida'
        });
    }

    next();
};

module.exports = validarApiKey;