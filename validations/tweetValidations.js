const { check } = require("express-validator");
const validate = require('./validation')

const publishTweetValidation = validate([
    check("body", "El tweet debe de incluir un cuerpo").notEmpty()
]);
  
module.exports = {
    publishTweetValidation,
};