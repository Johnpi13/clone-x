const validateToken = (req, res) => {
    res.status(200).json({
        authenticated: true
    });
}

module.exports = validateToken;