const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            success: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = userId;
        const { userName } = jwt.verify(token, process.env.JWT_SECRET);
        req.user = userName;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            msg: 'Token no válido'
        });
    }
}

module.exports = {
    validateToken
}