// middlewares/validarJoi.js
const validarJoi = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        
        if (error) {
            const errores = error.details.map(detalle => detalle.message);
            return res.status(400).json({
                error: 'Datos de entrada inválidos',
                detalles: errores
            });
        }
        
        next();
    };
};

module.exports = validarJoi;