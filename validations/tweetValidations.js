const { check } = require('express-validator');
const validate = require('./validation'); 

const publishTweetValidation = validate([
    check("body", "El tweet debe incluir un cuerpo").notEmpty(),
]);

module.exports = {
    publishTweetValidation,
};
