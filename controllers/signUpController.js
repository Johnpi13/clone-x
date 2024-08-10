const { validationResult } = require("express-validator");

const signUpUser = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return;
    }
  
    res.status(200).json({
      msg: "logged in",
    });
}

module.exports = {
    signUpUser
}