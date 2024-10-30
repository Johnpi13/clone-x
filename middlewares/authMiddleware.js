const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            success: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        const { userName, _id } = jwt.verify(token, process.env.JWT_SECRET);
        req.user = userName;
        req.userId = _id;

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