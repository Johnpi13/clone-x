const bcrypt = require('bcrypt')
const userService = require('../services/userService');
const authService = require('../services/authService');
const { validationResult } = require("express-validator");

const signInUser = async (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return;
  }

  try {
    const user = await userService.getUser({ userName: request.body.userName })
    
    const userPassword = request.body.password;

    const match = await bcrypt.compare(userPassword, user.password)

    if (match) {
      const { password, ...payload } = user;
      const token = await authService.getAuthToken(payload._doc)

      response.cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/'
      }).status(200).json({
        msg: "logged in",
        authToken: token
      });
    } else {
      response.status(401).json({
        error: "Unauthorized",
        message: "Invalid credentials",
      })
    }
  }
  catch (err) {
    response.status(401).json({
      error: "Unauthorized",
      message: "Invalid credentials",
      statusCode: 401
    })
  }
}

module.exports = {
  signInUser
}